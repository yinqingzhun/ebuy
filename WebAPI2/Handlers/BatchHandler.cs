using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace WebAPI2.Handlers
{
    public class BatchHandler : HttpMessageHandler
    {
        HttpMessageInvoker _server;

        public BatchHandler(HttpConfiguration config)
        {
            _server = new HttpMessageInvoker(new HttpServer(config));
        }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            // Return 400 for the wrong MIME type
            if ("multipart/batch" !=
                request.Content.Headers.ContentType.MediaType)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest);
            }

            // Start a multipart response 
            var outerContent = new MultipartContent("batch");
            var outerResp = request.CreateResponse();
            outerResp.Content = outerContent;

            // Read the multipart request
            var multipart = await request.Content.ReadAsMultipartAsync();

            foreach (var httpContent in multipart.Contents)
            {
                HttpResponseMessage innerResp = null;

                try
                {
                    // Decode the request object
                    var innerReq = await
                        httpContent.ReadAsHttpRequestMessageAsync();

                    // Send the request through the pipeline
                    innerResp = await _server.SendAsync(
                        innerReq,
                        cancellationToken
                    );
                }
                catch (Exception)
                {
                    // If exceptions are thrown, send back generic 400
                    innerResp = new HttpResponseMessage(
                        HttpStatusCode.BadRequest
                    );
                }

                // Wrap the response in a message content and put it
                // into the multipart response
                outerContent.Add(new HttpMessageContent(innerResp));
            }

            return outerResp;
        }
    }
}