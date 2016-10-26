using Dapper;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Ebuy.Controllers
{
    public class WebPageController : Controller
    {
        // GET: WebPage
        public ActionResult Index(string url, string filter)
        {
            ViewBag.List = "";
            if (string.IsNullOrWhiteSpace(url))
                return View();

            if (string.IsNullOrWhiteSpace(filter))
                filter = "//div[@id=\"auto-channel-lazyload-article\"]/ul[@class=\"article\"]/li";

            var nodeCollection = GetHtmlCollection(url, System.Text.Encoding.GetEncoding("gbk"), filter);
            if (nodeCollection != null)
            {
                StringBuilder text = new StringBuilder();
                foreach (var item in nodeCollection)
                {
                    HtmlNode link = item.SelectSingleNode("a");
                    if (link == null)
                        continue;
                    var href = link.GetAttributeValue("href", "");
                    link.SetAttributeValue("href", "/WebPage/detail?url=" + HttpUtility.UrlEncode(href));
                    text.Append(item.OuterHtml);
                }
                ViewBag.List = text.ToString();
            }
            return View();
        }

        



        public ActionResult Detail(string url)
        {
            var detail = GetDetail(url);
            if (detail == null)
                return HttpNotFound();
            return View(detail);
        }

        private WebPageDetail GetDetail(string url)
        {
            WebPageDetail detail = new Controllers.WebPageDetail();
            var doc = GetHtmlDocument(url, System.Text.Encoding.GetEncoding("gbk"));
            if (doc != null)
            {
                var articleNode = doc.DocumentNode.SelectSingleNode("//div[@id=\"articlewrap\"]");
                if (articleNode != null)
                {
                    detail.Title = GetInnerHtml(articleNode, "h1");
                    detail.Content = GetInnerHtml(articleNode, "div[@class=\"article-content\"]", 0, -6);
                    DateTime dt = DateTime.Now;
                    if (DateTime.TryParse(GetInnerHtml(articleNode, "div[@class=\"article-info\"]/span"), out dt))
                        detail.PublishTime = dt;
                    detail.Tags = string.Join(",", GetInnerHtmlList(articleNode, "//span[@class=\"tags\" or contains(@class,' tags ') or starts-with(@class,'tags ') or substring(@class,string-length(@class)-4)=' tags']/a"));
                    return detail;
                }

            }

            return null;



        }

        private string GetInnerHtml(HtmlNode node, string xpath, int childFrom = 0, int childTo = -1)
        {
            StringBuilder sb = new StringBuilder();
            var n = node.SelectSingleNode(xpath);
            if (n != null)
            {
                int childCount = n.ChildNodes.Count;
                if (childFrom > childCount - 1 || childFrom < -childCount)
                    childFrom = childCount - 1;
                if (childTo > childCount - 1 || childTo < -childCount)
                    childTo = childCount - 1;

                if (childFrom < 0)
                    childFrom = childCount + childFrom;
                if (childTo < 0)
                    childTo = childCount + childTo;

                for (int i = childFrom; i <= childTo; i++)
                {
                    sb.Append(n.ChildNodes[i].OuterHtml);
                }
            }
            return sb.ToString();
        }

        private List<string> GetInnerHtmlList(HtmlNode node, string xpath)
        {
            List<string> list = new List<string>();
            var n = node.SelectNodes(xpath);
            if (n != null)
            {
                foreach (HtmlNode item in n)
                {
                    list.Add(item.InnerHtml);
                }
            }
            return list;
        }

        private HtmlDocument GetHtmlDocument(string url, Encoding encoding)
        {
            var request = WebRequest.Create(url);
            using (var reponse = request.GetResponse())
            {
                HtmlDocument doc = new HtmlDocument();
                doc.Load(reponse.GetResponseStream(), encoding);
                return doc;
            }
        }
        private HtmlNodeCollection GetHtmlCollection(string url, Encoding encoding, string filter)
        {
            HtmlDocument doc = GetHtmlDocument(url, encoding);
            var nodeCollection = doc.DocumentNode.SelectNodes(filter);
            return nodeCollection;
        }
    }
    public class WebPageDetail
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string CoverUrl { get; set; }
        public string VideoUrl { get; set; }
        public DateTime PublishTime { get; set; }

        public string Tags { get; set; }

    }

    public class AutoHomeNewsSpiderDto
    {
        public int news_id { get; set; }
        public string title { get; set; }
        public string short_content { get; set; }
        public DateTime create_time { get; set; }
        public DateTime publish_time { get; set; }
        public string tags { get; set; }
        public string content { get; set; }
    }
}