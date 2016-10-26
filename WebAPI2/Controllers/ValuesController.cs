using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI2.Filter;

namespace WebAPI2.Controllers
{
    //[Authorize]
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        /// <summary>
        /// 获取指定ID的值
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        
        public string Get(int id)
        {
           
            if (id <= 0)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No value with ID = {0}", id)),
                    ReasonPhrase = "Value ID Not Found"
                };
                throw new HttpResponseException(resp);
            }
            return "value of" + id;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }
        [NotImplExceptionFilter]
        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            throw new NotImplementedException();
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
