using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace Ebuy.Controllers
{
    public class SignController : Controller
    {
        string ss = @"nonce=6b9b2e9e-55eb-48fe-a2b3-f23418d2c2e0&timestamp=1441683342&app_ver=2.4.0&content=%25E6%2581%25AD%25E5%2596%259C%25E6%25A5%25BC%25E4%25B8%25BB%25EF%25BC%258CCS75%25E6%2580%25A7%25E4%25BB%25B7%25E6%25AF%2594%25E7%259A%2584%25E7%25A1%25AE%25E5%25BE%2588%25E5%25A5%25BD%25EF%25BC%2581&topicId=8046574&method=user.forum.addreply&authentickitrequestparamname=FF75E61F8A94C3308709F9878E16BC7C373926BF5965F65993CE0BFBF1BABF62011FBDEDB2272E0CDBDA4093A194F2C7AA2819AD517450DD04A008F1EF790ACC5FAAA3C8B1570DA596CE3DBC2E2ADEB837ADDBB654BB8BDB9D22EC4E49F16E6368CF3D92C90F11FB72E992BEED27C45B5151622C937D140094E5ECA0472CF90A93B679BE&v=1.0&boardid=-1&app_key=100051&forumid=8050&title=&sign=6EB623AEBA6842B0B64F9337D043055B&auth_ticket=FF75E61F8A94C3308709F9878E16BC7C373926BF5965F65993CE0BFBF1BABF62011FBDEDB2272E0CDBDA4093A194F2C7AA2819AD517450DD04A008F1EF790ACC5FAAA3C8B1570DA596CE3DBC2E2ADEB837ADDBB654BB8BDB9D22EC4E49F16E6368CF3D92C90F11FB72E992BEED27C45B5151622C937D140094E5ECA0472CF90A93B679BE&channel=AF02&pid=193&app_type=android";
        public Dictionary<string, object> GetDic(string queryString)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();
            Array.ForEach(queryString.Split('&'), p =>
            {
                string[] s = p.Split('=');
                dic.Add(s[0], s[1]);
            });
            return dic;
        }
        public ContentResult Ok()
        {
            string r = "";//不一致的参数值
            var copy = GetDic(ss);
            var dic = DeriveRequestParameters();

            foreach (var key in copy.Keys)
            {
                if (!copy[key].ToString().Equals(dic[key].ToString()))
                    r += key + ",";
            }
            var signName = "sign";
            if (!dic.ContainsKey(signName))
            {
                return Content("缺少sign");
            }
            var sign = Convert.ToString(dic[signName] ?? "");
            dic.Remove(signName);

            int errorCode;
            if (!new Signer().Valid(dic, sign, out errorCode))
                return Content(r + Environment.NewLine + errorCode + ":" + Signer.GetValidErrorInfo(errorCode));
            return Content("OK");

        }
        private Dictionary<string, object> DeriveRequestParameters()
        {
            var dic = new Dictionary<string, object>();
            var req = System.Web.HttpContext.Current.Request;

            foreach (var i in req.QueryString.AllKeys)
            {
                if (i == null)
                {
                    continue;
                }
                dic.Add(i, req.QueryString[i]);
            }

            foreach (var i in req.Form.AllKeys)
            {
                if (i == null)
                {
                    continue;
                }
                dic[i] = req.Form[i];
            }
            return dic;
        }

        class Signer
        {
            private readonly string _paramsValueSecret = "abcb040d991e4e8598e8b9baed2c070d";
            private const string ParamsNameTimestamp = "timestamp";
            private static Dictionary<int, string> dic = new Dictionary<int, string>();
            static Signer()
            {
                dic.Add(902, "请求签名错误");
                dic.Add(903, "请求未提供时间戳参数");
                dic.Add(905, "你的时间和服务器时间差别太大，是穿越了吗？");
            }
            public static string GetValidErrorInfo(int errorCode)
            {
                if (dic.ContainsKey(errorCode))
                    return dic[errorCode];
                return string.Empty;
            }
            public bool Valid(IDictionary<string, object> data, string sign, out int errorCode)
            {
                errorCode = 0;
                if (!data.ContainsKey(ParamsNameTimestamp))
                {
                    errorCode = 903;
                    return false;
                }

                var timer = Convert.ToInt64(data[ParamsNameTimestamp]);

                var epoch = (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000;

                var diff = Math.Abs(epoch - timer);

                //if (diff / 60 > 600)
                //{
                //    errorCode = 905;
                //    return false;
                //}

                var ret = Generate(data);
                bool b = Generate(data) == sign.ToUpper();
                if (!b)
                    errorCode = 902;
                return b;
            }
            public string Generate(IDictionary<string, object> data)
            {
                var sort = new SortedDictionary<string, object>(data);
                var ret = new StringBuilder();

                foreach (var item in sort)
                {
                    ret.Append(item.Key);
                    ret.Append(item.Value);
                }

                ret.Insert(0, _paramsValueSecret);
                ret.Append(_paramsValueSecret);

                var sign = MD5(ret.ToString()).ToUpper();

                return sign;
            }
            public static string MD5(string context)
            {
                byte[] ret = Encoding.UTF8.GetBytes(context);
                System.Security.Cryptography.MD5 md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
                byte[] output = md5.ComputeHash(ret);
                return BitConverter.ToString(output).Replace("-", "");
            }
        }
    }
}
