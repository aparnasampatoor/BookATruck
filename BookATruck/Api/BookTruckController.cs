using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AbhiDurandal.Models;
using BookATruck.Models;

namespace BookATruck.Api
{
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
        public HttpResponseMessage GetRoute([FromUri] Route route)
        {
            List<Route> routes;

            System.DateTime dateTime = new System.DateTime(1970, 1, 1, 0, 0, 0, 0);

            // Add the number of seconds in UNIX timestamp to be converted.
            dateTime = dateTime.AddSeconds(route.SearchDate/1000);


            using (var context = new BookTruckDbContext())
            {
                if (dateTime == DateTime.MinValue)
                {
                    dateTime = DateTime.Now.Date;
                }
                routes = context.Routes
                    .Where(x => x.Source == route.Source
                                && x.Destination == route.Destination
                                && dateTime.Year == x.FromDate.Year
                                && dateTime.Day == x.FromDate.Day
                                && dateTime.Month == x.FromDate.Month
                                ).ToList();
            }
            var httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, routes);
            return httpResponseMessage;
        }
    }
}