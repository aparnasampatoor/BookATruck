using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookATruck.Models;

namespace BookATruck.Api
{
    [RoutePrefix("api/BookTruck")]
    public class BookTruckController : BaseApiController
    {
        [HttpPost]
        public HttpResponseMessage Route([FromBody] Route route)
        {
            route.PostedByName = string.IsNullOrEmpty(User.Email) ? "Anonymous" : User.Email;
            using (var context = new BookTruckDbContext())
            {
                context.Routes.Add(route);
                route.FromDate = route.FromDate == DateTime.MinValue ? DateTime.Now : route.FromDate;
                context.SaveChanges();
            }

            return Request.CreateResponse(HttpStatusCode.OK, true);
        }

        [HttpGet]
        [Route("TruckTypes")]
        public HttpResponseMessage GetTruckTypes()
        {
            var truckTypes = new List<TruckType>
            {
                new TruckType
                {
                    Id = 0,
                    Name = "Select Truck Type"
                },
                new TruckType
                {
                    Id = 1,
                    Name = "Flatbed"
                },
                new TruckType
                {
                    Id = 2,
                    Name = "Refrigerated Dry Freight"
                },
                new TruckType
                {
                    Id = 3,
                    Name = "Tank Trailer"
                },
                new TruckType
                {
                    Id = 4,
                    Name = "Auto Trailer"
                }
            };

            return Request.CreateResponse(HttpStatusCode.OK, truckTypes);
        }

        [HttpGet]
        [Route("SearchRoute")]
        public HttpResponseMessage GetRoute([FromUri] RouteFilter route)
        {
            List<Route> routes;

            System.DateTime dateTime = new System.DateTime(1970, 1, 1, 0, 0, 0, 0);

            // Add the number of seconds in UNIX timestamp to be converted.
            dateTime = dateTime.AddSeconds(route.SearchDate / 1000);


            using (var context = new BookTruckDbContext())
            {
                if (dateTime == DateTime.MinValue)
                {
                    dateTime = DateTime.Now.Date;
                }
                var routesQuery = context.Routes
                    .Where(x => x.Source == route.Source
                                && x.Destination == route.Destination
                                && dateTime.Year == x.FromDate.Year
                                && dateTime.Day == x.FromDate.Day
                                && dateTime.Month == x.FromDate.Month
                    );

                if (route.TruckTypeId >= 1)
                {
                    routesQuery = routesQuery.Where(x => x.TruckTypeId == route.TruckTypeId);
                }
                if (route.LoadType != null)
                {
                    routesQuery = routesQuery.Where(x => x.LoadType == route.LoadType);
                }
                if (route.VolumeStart != null)
                {
                    routesQuery = routesQuery.Where(x => x.Volume >= route.VolumeStart);
                }
                if (route.VolumeEnd != null)
                {
                    routesQuery = routesQuery.Where(x => x.Volume <= route.VolumeEnd);
                }
                if (route.WeightStart != null)
                {
                    routesQuery = routesQuery.Where(x => x.Weight >= route.WeightStart);
                }
                if (route.WeightEnd != null)
                {
                    routesQuery = routesQuery.Where(x => x.Weight <= route.WeightEnd);
                }
                routes = routesQuery.ToList();
            }
            var httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, routes);
            return httpResponseMessage;
        }
    }
}