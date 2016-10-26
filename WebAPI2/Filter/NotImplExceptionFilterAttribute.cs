using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace WebAPI2.Filter
{
    public class NotImplExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {

            if (actionExecutedContext.Exception is NotImplementedException)
            {
                actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
            }
        }
    }
}