using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web;

namespace WebAPI2.Formatters
{
    public class CsvFormatter<T> : BufferedMediaTypeFormatter where T : new()
    {
        public CsvFormatter()
        {
            // Add the supported media type.
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/csv"));
        }
        public override bool CanReadType(Type type)
        {
            return false;
        }

        public override bool CanWriteType(Type type)
        {
            if (type == typeof(T))
            {
                return true;
            }
            else
            {
                Type enumerableType = typeof(IEnumerable<T>);
                return enumerableType.IsAssignableFrom(type);
            }
        }
    }
}