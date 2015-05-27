using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace AbhiDurandal.Models
{
    public class Route : EntityBase
    {
        public string Source { get; set; }

        public string Destination { get; set; }

        public DateTime FromDate { get; set; }

        public double SearchDate { get; set; }

        public string PostedByName { get; set; }

    }

    public class RouteMap : EntityTypeConfiguration<Route>
    {
        public RouteMap()
        {
            Ignore(x => x.SearchDate);
        }
    }

    public class EntityBase 
    {
        public int Id { get; set; }

        //public DateTime Created { get; set; }

        //public DateTime Modified { get; set; }
    }
}