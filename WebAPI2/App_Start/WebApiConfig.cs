using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using WebAPI2.MessageHandler;
using System.Web.Http.Dispatcher;
using Microsoft.Practices.Unity;
using WebAPI2.DI;
using WebAPI2.Handlers;
using System.Web.Http.Tracing;

namespace WebAPI2
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //DI
            var container = new UnityContainer();
            //container.RegisterType<IProductRepository, ProductRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
            //批量HTTP请求
            var batchHandler = new BatchHandler(config);
            config.Routes.MapHttpRoute("batch", "api/batch",
                                       null, null, batchHandler);
            // Web API 配置和服务
            // 将 Web API 配置为仅使用不记名令牌身份验证。
            config.SuppressDefaultHostAuthentication();
            config.SuppressHostPrincipal();
            //config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            SystemDiagnosticsTraceWriter traceWriter = config.EnableSystemDiagnosticsTracing();
            traceWriter.IsVerbose = true;
            traceWriter.MinimumLevel = TraceLevel.Debug;
            //config.Formatters.Add(ne)
            // Web API 路由
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional },
                constraints: new { id = "^\\d*$" }
            );

            // Per-Route Message Handler
            // List of delegating handlers.
            DelegatingHandler[] handlers = new DelegatingHandler[] { new TimestampMessageHandler() };

            // Create a message handler chain with an end-point.
            var routeHandlers = HttpClientFactory.CreatePipeline(new HttpControllerDispatcher(config), handlers);

            config.Routes.MapHttpRoute(
               name: "DefaultApi2",
               routeTemplate: "api2/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional },
               constraints: null,
                handler: routeHandlers
           );
        }
    }
}
