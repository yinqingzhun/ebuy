using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ebuy.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/

        public ActionResult Index()
        {
            ViewBag.App = RouteData.Values["app"];
            ViewBag.Version = RouteData.Values["version"];
            return View();
        }

    }
}
