using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Ebuy.Filters
{
    public class ControllerExceptionAttribute : HandleErrorAttribute//FilterAttribute, IExceptionFilter//
    {
        public override  void OnException(ExceptionContext filterContext)
        {
            //base.OnException(filterContext);
        }
    }
}