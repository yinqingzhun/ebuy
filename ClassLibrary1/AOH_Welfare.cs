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
    
    public partial class AOH_Welfare
    {
        public AOH_Welfare()
        {
            this.AOH_JoinWelfare = new HashSet<AOH_JoinWelfare>();
        }
    
        public int WelfareId { get; set; }
        public int Quantity { get; set; }
        public System.DateTime StartTime { get; set; }
        public System.DateTime EndTime { get; set; }
        public string Requirement { get; set; }
        public int SupportedPersonCount { get; set; }
        public string Address { get; set; }
        public string Detail { get; set; }
        public string Type { get; set; }
        public int DisplayNo { get; set; }
        public string CoverUrl { get; set; }
        public Nullable<int> Np { get; set; }
    
        public virtual ICollection<AOH_JoinWelfare> AOH_JoinWelfare { get; set; }
    }
}