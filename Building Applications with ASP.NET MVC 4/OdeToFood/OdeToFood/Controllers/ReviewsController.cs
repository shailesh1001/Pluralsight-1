using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using OdeToFood.Models;
using System.Data;

namespace OdeToFood.Controllers
{
    public class ReviewsController : Controller
    {
        //
        // GET: /Reviews/

        //public ActionResult BestReview()
        //{

        //    var bestReview = from r in _reviews
        //                     orderby r.Rating descending
        //                     select r;

        //    return PartialView("_Review", bestReview.First());
        //}
        OdeToFoodDb _db = new OdeToFoodDb();

        public ActionResult Index([Bind(Prefix="id")] int restaurantId)
        {
            var restaurant = _db.Restaurants.Find(restaurantId);
            if (restaurant != null)
            {
                return View(restaurant);
            }

            return HttpNotFound();
        }

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }

        [HttpGet]
        public ActionResult Create (int restaurantId)
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(RestaurantReview review)
        {
            if(ModelState.IsValid)
            {
                _db.Reviews.Add(review);
                _db.SaveChanges();
                return RedirectToAction("Index", new { id = review.RestaurantId });
            }
            return View();
        }

        [HttpGet]
        public ActionResult Edit (int id)
        {
            var model = _db.Reviews.Find(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Edit (RestaurantReview review)
        {
            if(ModelState.IsValid)
            {
                _db.Entry(review).State = EntityState.Modified;
                _db.SaveChanges();
                return RedirectToAction("Index", new {id = review.RestaurantId});
            }

            return View(review);
        }

        //public ActionResult Edit(int id)
        //{
        //    var review = _reviews.Single(r => r.Id == id);

        //    return View(review);
        //}

        //[HttpPost]
        //public ActionResult Edit(int id, FormCollection collection)
        //{
        //    var review = _reviews.Single(r => r.Id == id);
        //    if (TryUpdateModel(review))
        //    {
        //        // ..
        //        return RedirectToAction("Index");
        //    }
        //    return View(review);
        //}

        ////
        //// GET: /Reviews/Details
        //public ActionResult Details(int id)
        //{
        //    return View();
        //}


        ////
        //// GET: /Reviews/Create
        //public ActionResult Create(int id)
        //{
        //    return View();
        //}



        //[HttpPost]
        //public ActionResult Delete(int id, FormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction("Index");
        //    }
        //    catch
        //    {

        //        return View();
        //    }
        //}


    }
}
