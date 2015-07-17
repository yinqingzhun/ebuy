using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ebuy.CustomAttribute
{
    public class CustomActionFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            //filterContext.RequestContext.HttpContext.Response.Write("OnActionExecuted at " + DateTime.Now.ToString("G") + "<br/>");
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //filterContext.RequestContext.HttpContext.Response.Write("OnActionExecuting at " + DateTime.Now.ToString("G") + "<br/>");
            filterContext.Result = new JsonResult() { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = new { status = 0, name = filterContext.ActionDescriptor.ActionName, results = new[] { 1, 3, 5 } } };
        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            //filterContext.RequestContext.HttpContext.Response.Write("OnResultExecuted at " + DateTime.Now.ToString("G") + "<br/>");
        }

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            //filterContext.RequestContext.HttpContext.Response.Write("OnResultExecuting at " + DateTime.Now.ToString("G") + "<br/>");
        }
    }
}