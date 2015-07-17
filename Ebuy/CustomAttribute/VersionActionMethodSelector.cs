using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ebuy.CustomAttribute
{
    public class VersionActionMethodSelector : ActionMethodSelectorAttribute
    {
        private const string VersionName = "actionversion";
        public string ActionVersion { get; set; }

        public override bool IsValidForRequest(ControllerContext controllerContext, System.Reflection.MethodInfo methodInfo)
        {
            if (string.IsNullOrWhiteSpace(ActionVersion))
                return true;
            var v = controllerContext.Controller.ValueProvider.GetValue(VersionName);

            bool b = v != null && string.Equals(ActionVersion, v.AttemptedValue, StringComparison.OrdinalIgnoreCase);
            return b;
        }
    }
}