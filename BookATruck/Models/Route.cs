using System;
using System.Data.Entity.ModelConfiguration;

namespace BookATruck.Models
{
    public class Route : EntityBase
    {
        public string Source { get; set; }

        public string Destination { get; set; }

        public DateTime FromDate { get; set; }

        public double SearchDate { get; set; }

        public string PostedByName { get; set; }

        public LoadType? LoadType { get; set; }

        public int? Volume { get; set; }

        public int? Weight { get; set; }

        //public TruckType TruckType { get; set; }

        public int TruckTypeId { get; set; }
    }

    public enum LoadType
    {
        FullTruckLoad = 1,
        PartialLoad = 2
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