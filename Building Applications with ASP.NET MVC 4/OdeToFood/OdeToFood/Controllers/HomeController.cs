using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using OdeToFood.Models;

namespace OdeToFood.Controllers
{
    //[Authorize]
    //[Authorize(Users="jlouie")]
    public class HomeController : Controller
    {
        OdeToFoodDb _db = new OdeToFoodDb();

        public ActionResult Autocomplete(string term)
        {
            var model =
                _db.Restaurants
                .Where(r => r.Name.StartsWith(term))
                .Take(10)
                .Select(r => new
                {
                    label = r.Name
                });
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        //[AllowAnonymous]
        [OutputCache(Duration=60)]
        public ActionResult Index(string searchTerm = null, int page = 1)
        {
            // Comprehension Syntax
            //var model =
            //    from r in _db.Restaurants
            //    orderby r.Reviews.Count() descending
            //    select new RestaurantListViewModel
            //    {
            //        Id = r.Id,
            //        Name = r.Name,
            //        City = r.City,
            //        Country = r.Country,
            //        CountOfReviews = r.Reviews.Count()
            //    };

            // Extension Method Syntax
            var model =
                _db.Restaurants
                    .OrderByDescending(r => r.Name)
                    .Where(r => searchTerm == null || r.Name.StartsWith(searchTerm))
                    .Select(r => new RestaurantListViewModel
                            {
                                Id = r.Id,
                                Name = r.Name,
                                City = r.City,
                                Country = r.Country,
                                CountOfReviews = r.Reviews.Count()
                            }).ToPagedList(page, 10);

            if(Request.IsAjaxRequest())
            {
                return PartialView("_Restaurants", model);
            }

            //var controller = RouteData.Values["controller"];
            //var action = RouteData.Values["action"];
            //var id = RouteData.Values["id"];

            //var message = String.Format("{0}::{1} {2}", controller, action, id);

            //ViewBag.Message = message;

            return View(model);
        }

        public ActionResult About()
        {
            var model = new AboutModel();
            model.Name = "Jon";
            model.Location = "Maryland, USA";
            return View(model);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (_db != null)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
