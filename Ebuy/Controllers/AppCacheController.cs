using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ebuy.Controllers
{
    [HandleErrorAttribute]
    public class AppCacheController : Controller
    {
        //
        // GET: /AppCache/

        public ActionResult Index()
        {
            ViewBag.status = 101;
            ViewBag.message = Request.QueryString["id"];
            dynamic r = new ExpandoObject();
            r.Name = "张三";
            r.Age = 18;
            return View(r);
        }

        public ActionResult Index2()
        {

            return View();
        }

    }
}
