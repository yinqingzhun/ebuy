using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Ebuy
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            //routes.RouteExistingFiles = true;
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //routes.IgnoreRoute("{resource}.html/{*pathInfo}");
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
                , namespaces: new string[] { "Ebuy.d" }
                //,constraints:new { controller = @"^m\w*"  }

            );

            routes.MapRoute(
                name: "app_version"
                , url: "{app}/{version}/x/{controller}/{action}"
                , defaults: new { controller = "Test", action = "Index", id = UrlParameter.Optional }
                , constraints: new { controller = @"\w+", httpMethed = new HttpMethodConstraint("post") }
                );

            routes.MapPageRoute("js", "{areacode}/{days}", "~/pages/wf.aspx", false, new RouteValueDictionary { { "areacode", "1" }, { "days", "10" } }, null);

        }
    }
}