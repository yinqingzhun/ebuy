using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace WebAPI2.MessageHandler
{
    /// <summary>
    /// 给api接口增加服务器响应时间戳
    /// </summary>
    public class TimestampMessageHandler : DelegatingHandler
    {
        /// <summary>
        /// 异步发送请求给内部消息处理对象
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        async protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await base.SendAsync(request, cancellationToken);
            response.Headers.Add("Server-Timestamp", DateTime.UtcNow.ToString());
            return response;
        }
    }
}