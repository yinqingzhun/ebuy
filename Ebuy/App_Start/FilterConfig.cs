using Ebuy.CustomAttribute;
using System.Web;
using System.Web.Mvc;
using StackExchange.Profiling;
using Ebuy.Filters;
namespace Ebuy
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new GlobalExceptionAttribute());
        }
    }
}