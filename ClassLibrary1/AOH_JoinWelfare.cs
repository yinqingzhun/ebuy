//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ClassLibrary1
{
    using System;
    using System.Collections.Generic;
    
    public partial class AOH_JoinWelfare
    {
        public int JoinWelfareID { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserPhoneNum { get; set; }
        public int WelfareId { get; set; }
        public System.DateTime JoinWelfareTime { get; set; }
    
        public virtual AOH_Welfare AOH_Welfare { get; set; }
    }
}