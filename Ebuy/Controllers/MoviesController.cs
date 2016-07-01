using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ebuy.Models;
using System.IO.Compression;
using System.Web.Script.Serialization;

namespace Ebuy.Controllers
{
    public class MoviesController : Controller
    {
        private MovieDBContext db = new MovieDBContext();

        //
        // GET: /Movies/

        public ActionResult Index()
        {
            var list = db.Movies.Where(p => p.ID > 0);
            int count = list.Count();
            list = list.OrderBy(p => p.Price);
            return View(db.Movies.ToList());
        }

        //
        // GET: /Movies/Details/5

        public ActionResult Details(int id = 0)
        {

            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        //
        // GET: /Movies/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Movies/Create

        [HttpPost]
        public ActionResult Create(Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Movies.Add(movie);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(movie);
        }

        //
        // GET: /Movies/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        //
        // POST: /Movies/Edit/5

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(Movie movie)
        {
            //ModelState.AddModelError("", "xx");
            if (ModelState.IsValid)
            {
                movie = db.Movies.Find(movie.ID);
                UpdateModel(movie, new string[] { "Title" });
                db.Entry(movie).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(movie);
        }

        //
        // GET: /Movies/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        //
        // POST: /Movies/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Movie movie = db.Movies.Find(id);
            db.Movies.Remove(movie);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        public void GetJson()
        {
            var o = new { Success = true, State = 1 };
            this.HttpContext.Response.AppendHeader("Content-Encoding", "gzip");
            this.HttpContext.Response.Filter = new GZipStream(HttpContext.Response.Filter, CompressionMode.Compress);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            this.HttpContext.Response.Write(serializer.Serialize(o));
            this.HttpContext.Response.ContentType = "application/json";
            this.HttpContext.Response.End();

        }

        public void CE(string typeid = "1", string FileName = "test.csv")
        {

            DataSet ds = new DataSet();
            DataTable dt = ds.Tables.Add();
            dt.Columns.Add("姓名");
            dt.Columns.Add("年龄");
            dt.Columns.Add("民族");
            dt.Columns.Add("性别");
            dt.Rows.Add("张三", "18", "汉族", "男");
            dt.Rows.Add("张三5", "22", "汉族", "女");
            dt.Rows.Add("张三7", "64", "汉族", "不详");

            HttpResponseBase resp;
            resp = HttpContext.Response;
            resp.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
            resp.AppendHeader("Content-Disposition", "attachment;filename=" + FileName);
            string colHeaders = "", ls_item = "";
            int i = 0;

            //定义表对象与行对像，同时用DataSet对其值进行初始化




            // typeid=="1"时导出为EXCEL格式文件；typeid=="2"时导出为XML格式文件
            if (typeid == "1")
            {
                //取得数据表各列标题，各标题之间以\t分割，最后一个列标题后加回车符
                for (i = 0; i < dt.Columns.Count; i++)
                {
                    colHeaders += dt.Columns[i].Caption.ToString() + ",";
                    //colHeaders += dt.Columns[i].Caption.ToString() + "\n";
                }
                //向HTTP输出流中写入取得的数据信息
                resp.Write(colHeaders + "\r\n");
                //逐行处理数据  
                foreach (DataRow row in dt.Rows)
                {
                    //在当前行中，逐列获得数据，数据之间以\t分割，结束时加回车符\n
                    for (i = 0; i < dt.Columns.Count; i++)
                    {
                        ls_item += row[i].ToString() + ",";
                        //ls_item += row[i].ToString() + "\n";
                    }

                    //当前行数据写入HTTP输出流，并且置空ls_item以便下行数据    
                    resp.Write(ls_item + "\r\n");
                    ls_item = "";
                }
            }
            else
            {
                if (typeid == "2")
                {
                    //从DataSet中直接导出XML数据并且写到HTTP输出流中
                    resp.Write(ds.GetXml());
                }
            }
            //写缓冲区中的数据到HTTP头文件中
            resp.End();


        }
    }
}