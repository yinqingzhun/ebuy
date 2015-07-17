using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ebuy.CustomAttribute
{
    public class HttpGetActionMethodSelectorAttribute : ActionMethodSelectorAttribute
    {
        public string HttpMethod { get; set; }
        public override bool IsValidForRequest(ControllerContext controllerContext, System.Reflection.MethodInfo methodInfo)
        {
            if (string.IsNullOrWhiteSpace(HttpMethod))
                return true;
            if (controllerContext == null || methodInfo == null)
                return false;
            return string.Compare(controllerContext.HttpContext.Request.HttpMethod, HttpMethod, StringComparison.OrdinalIgnoreCase) == 0;
        }
    }
}