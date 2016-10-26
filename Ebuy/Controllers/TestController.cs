using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace Ebuy.Controllers
{
    public class TestController : ApiController
    {
        //
        // GET: /Test/

        [HttpPost]
        public string PushMessage(string x, string y, Person p)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(new { x, y, p });
        }
        [HttpGet]
        public string GetMessage()
        {
            return "message";
        }
        [HttpGet]
        public System.Web.Http.Routing.IHttpRoute Index()
        {
            var route = this.ControllerContext.RouteData.Route;
            return route;
        }
        [HttpPost]
        [ResponseType(typeof(HttpResult))]
        public async Task<IHttpActionResult> Upload()
        {
            return Ok(new HttpResult() { success = true, file_path = "http://chezhu2.autoimg.cn/g14/M15/83/D4/wKjByVgQEBaAS-ACAAMd3VWuTik881_w960_h1280.jpg" });
        }

    }
    public class HttpResult
    {
        public bool success { get; set; }
        public string file_path { get; set; }
    }
    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public override string ToString()
        {
            return this.Name + ": " + this.Age;
        }
    }
}
