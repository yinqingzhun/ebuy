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
using System;
using Ebuy.Filters;
using Ebuy.BaseControllers;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Ebuy.Controllers
{
    [ControllerExceptionAttribute(Order = 16)]
    public class HomeController : BaseController
    {

        [ValidateInput(true)]
        [ActionName("Index")]
        [HttpGetActionMethodSelector(HttpMethod = "get")]
        [WrongTimeExceptionAttribute(Order = 13)]
        public ActionResult Index()
        {
            //throw new Exception();
            //var profiler = MiniProfiler.Current;
            //string s = "";
            ////using (profiler.Step("find SeckillingWinner in db:"))
            ////{
            ////    MyDbEntities db = new MyDbEntities();
            ////    var o = db.AOH_SeckillingWinner.Find(10);
            ////    s = o == null ? "Not Found" : "Found!";
            ////}
            //using (var conn = new ProfiledDbConnection(new SqlConnection(WebConfigurationManager.ConnectionStrings["aoh"].ToString()), profiler))
            //{
            //    conn.Open();
            //    var command = conn.CreateCommand();
            //    string sql = "select count(1) from sys.objects";
            //    command.CommandText = sql;
            //    object o = command.ExecuteScalar();
            //    int i = int.Parse(o.ToString());
            //}


            ViewBag.Message = GetRequestIP();
            return View();

        }

        public string GetRequestIP(bool primaryIpWhenPublicIpNotExists = false)
        {
            IPAddress tempIP;
            List<string> primaryIpList = new List<string>();
            string result = String.Empty;
            result = HttpContext.Request.ServerVariables["HTTP_CDN_SRC_IP"];
            if (!string.IsNullOrEmpty(result))
            {
                if (!IsPrivateIPV4(result))  //代理即是IP格式，排除私有IP
                {
                    return result;
                }
                else
                {
                    primaryIpList.Add(result);
                }
            }

            if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
            {
                result = HttpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];//检查代理链
                if (!string.IsNullOrWhiteSpace(result) && !result.Equals("unknown"))//存在代理
                {

                    //可能有代理
                    if (result.IndexOf(":") != -1)//IPv6格式
                        result = null;
                    else
                    {
                        if (result.IndexOf(",") != -1)//经过多个代理
                        {
                            //有“,”，估计多个代理。取第一个不是内网的IP。
                            result = result.Replace(" ", "").Replace("'", "").Replace("\"", "");
                            string[] temparyip = result.Split(",;".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
                            for (int i = 0; i < temparyip.Length; i++)
                            {

                                if (!IsPrivateIPV4(temparyip[i]))//查找第一个非内网地址
                                {
                                    return temparyip[i];
                                }
                                else
                                {
                                    primaryIpList.Add(temparyip[i]);
                                }
                            }
                        }
                        else if (IPAddress.TryParse(result, out tempIP))  //经过一个代理，该值为客户IP
                            return result;
                        result = null;        //代理中的内容 非IP，取IP 
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(result))
            {
                result = HttpContext.Request.ServerVariables["Proxy_Client_IP"];
            }
            if (string.IsNullOrWhiteSpace(result))
            {
                result = HttpContext.Request.ServerVariables["WL_Proxy_Client_IP"];
            }
            if (string.IsNullOrWhiteSpace(result))
            {
                result = HttpContext.Request.ServerVariables["HTTP_CLIENT_IP"];
            }
            if (string.IsNullOrWhiteSpace(result))
            {
                result = HttpContext.Request.ServerVariables["REMOTE_ADDR"];
            }
            if (string.IsNullOrWhiteSpace(result))
            {
                result = HttpContext.Request.UserHostAddress;
            }

            return result;
        }
        /// <summary>
        /// 是否是私有的IPV4
        /// </summary>
        /// <param name="ip"></param>
        /// <returns></returns>
        private bool IsPrivateIPV4(string ip)
        {
            IPAddress tempIP = null;
            if (!IPAddress.TryParse(ip, out tempIP))
                return false;
            return ip.StartsWith("10.") || ip.Substring(0, 7) != "192.168" || new Regex(@"^172\.(1[6-9]|2\d|30|31)\.").IsMatch(ip);
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

        public ActionResult Do(int id, string name)
        {
            return Content("ok");
        }






    }
}
