using System;
using System.Linq;
using Entity;
using NUnit.Framework;

namespace Ebuy.Tests
{
    [TestFixture]
    public class Class1
    {
        [TestCase()]
        public void Run()
        {
            try
            {
                MyDbEntities db = new MyDbEntities();
               
            }
            catch (Exception)
            {

                throw;
            }


        }
    }
}
