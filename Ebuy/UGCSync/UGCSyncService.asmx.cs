using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Xml.Linq;
using log4net;
using Utils;
namespace Ebuy.UGCSync
{
    /// <summary>
    /// UGCSyncService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class UGCSyncService : System.Web.Services.WebService
    {

        [WebMethod]
        public void Send(string xmlMessage)
        {
            LogHelper.Info("收到消息：" + xmlMessage);
            try
            {
                XDocument document = XDocument.Parse(xmlMessage);
                XElement root = document.Element("Messages");
                if (root == null)
                    throw new Exception("找到根节点元素Messages");

                XElement headerElement = document.Element("Messages").Element("Header");
                XElement bodyElement = document.Element("Messages").Element("Body");
                if (bodyElement != null && headerElement != null)
                {
                    var appId = headerElement.Element("AppId").Value;
                    var entityType = headerElement.Element("EntityType").Value;
                    var operationType = headerElement.Element("OperateType").Value;
                    var entityGuid = bodyElement.Element("EntityId").Value;
                    var mainEntityId = bodyElement.Element("TopicEntityId") != null ? bodyElement.Element("TopicEntityId").Value : string.Empty;
                    //来自于问答平台，则消息转给问答过滤系统
                    if (appId.StartsWith("3"))
                    {
                        Ask.Filter.ServiceReference.ServiceSoapClient c = new Ask.Filter.ServiceReference.ServiceSoapClient();
                        c.ReceiveMessage(xmlMessage);

                        if (!appId.Equals("3019"))//排除来自汽车知道的数据
                        {
                            Data.Zhidao.ServiceReference.AskUGCSyncServiceSoapClient zhidao = new Data.Zhidao.ServiceReference.AskUGCSyncServiceSoapClient();
                            zhidao.ReceiveMessage(xmlMessage);
                        }

                    }
                    //来自于非问答平台，则消息转给问答平台
                    else
                    {
                        Ask.ServiceReference.AskUGCSyncServiceSoapClient c = new Ask.ServiceReference.AskUGCSyncServiceSoapClient();
                        c.ReceiveMessage(xmlMessage);
                    }

                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("消息系统解析消息失败。", ex);
            }

        }
    }
}
