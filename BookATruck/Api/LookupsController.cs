using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookATruck.Models;

namespace BookATruck.Api
{
    [RoutePrefix("api/Lookups")]
    public class LookupsController : ApiController
    {
        [Route("Cities/{query}")]
        public HttpResponseMessage GetCities(string query)
        {
            var cities = new List<string>();

            using (var context = new BookTruckDbContext())
            {
               cities  = context.Cities.Where(x => x.Name.StartsWith(query)).Select(x => x.Name).Take(5).ToList();
            }

            return Request.CreateResponse(HttpStatusCode.OK, cities);
        }
    }
}
