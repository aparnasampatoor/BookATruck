using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BookATruck.Models;
using Newtonsoft.Json;

namespace BookATruck.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var cookie = Request.Cookies.Get("BookTruck");
            ViewBag.Loggedin = 0;
            if (cookie != null)
            {
                ViewBag.Loggedin = 1;
            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}