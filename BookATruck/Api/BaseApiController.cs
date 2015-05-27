using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using BookATruck.Models;
using Newtonsoft.Json;

namespace BookATruck.Api
{
    public class BaseApiController : ApiController
    {
        public User User { get; set; }

        public BaseApiController()
        {
            User = new User();
        }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);

            var cookie = Request.Headers.GetCookies("BookTruck").FirstOrDefault();
            if (cookie != null)
            {
                var cookieValue = cookie["BookTruck"].Value;
                var user = JsonConvert.DeserializeObject<User>(cookieValue);
                if (user != null)
                {
                    User = user;
                }
            }
            
        }
    }
}