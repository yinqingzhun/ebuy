using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Security.Permissions;
using System.Web.Configuration;
using System.Web.Mvc;
using Ebuy.CustomAttribute;
using Entity;
using StackExchange.Profiling;
using StackExchange.Profiling.Data;

namespace Ebuy.Controllers
{
    public class HomeController : AsyncController
    {
        [ValidateInput(true)]
        [ActionName("Index")]
        [HttpGetActionMethodSelector(HttpMethod = "get")]
        public ActionResult Index()
        {
            var profiler = MiniProfiler.Current;
            string s = "";
            //using (profiler.Step("find SeckillingWinner in db:"))
            //{
            //    MyDbEntities db = new MyDbEntities();
            //    var o = db.AOH_SeckillingWinner.Find(10);
            //    s = o == null ? "Not Found" : "Found!";
            //}
            using (var conn = new ProfiledDbConnection(new SqlConnection(WebConfigurationManager.ConnectionStrings["aoh"].ToString()), profiler))
            {
                conn.Open();
                var command = conn.CreateCommand();
                string sql = "select count(1) from sys.objects";
                command.CommandText = sql;
                object o = command.ExecuteScalar();
                int i = int.Parse(o.ToString());
            }

            ViewBag.Message = "修改此模板以快速启动你的 ASP.NET MVC 应用程序。" + s;
            return View();

        }

        [ActionName("Index")]
        [VersionActionMethodSelector(ActionVersion = "1.0")]
        public ActionResult Index_V1_0()
        {
            ViewBag.Message = "欢迎你，这里是版本1.0的起始页";
            return View();
        }

        public void LoadHugeImageAsync()
        {
            AsyncManager.OutstandingOperations.Increment();
            var request = WebRequest.Create("http://www.baidu.com");
            request.BeginGetResponse(p =>
            {
                using (var response = request.EndGetResponse(p))
                {
                    if (response != null)
                        using (var reader = new StreamReader(response.GetResponseStream()))
                        {
                            AsyncManager.Parameters["text"] = reader.ReadToEnd();
                            AsyncManager.OutstandingOperations.Decrement();
                        }
                }
            }, null);
        }

        public ActionResult LoadHugeImageCompleted(string text)
        {
            return Content(text);
        }

        public ActionResult About()
        {
            ViewBag.Message = "你的应用程序说明页。";
            return View();
        }

        [Authorize(Users = "yinqz")]
        [PrincipalPermission(SecurityAction.Demand, Name = "yinqz")]
        public ActionResult Contact()
        {
            ViewBag.Message = "你的联系方式页。";

            return View();
        }
    }
}