using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookATruck.Models
{
    public class RouteFilter
    {
        public string Source { get; set; }

        public string Destination { get; set; }

        public double SearchDate { get; set; }

        public LoadType? LoadType { get; set; }

        public int? Volume { get; set; }

        public int? Weight { get; set; }

        public int TruckTypeId { get; set; }
    }
}