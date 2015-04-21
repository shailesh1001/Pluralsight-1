using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using OdeToFood.Filters;

namespace OdeToFood.Controllers
{
    public class CuisineController : Controller
    {
        //
        // GET: /Cuisine/


        [LogAttribute]  // Our custom action filter
        // [Authorize] // Requires user to be logged in
        //[HttpPost]  // Action method only reachable via POST request
        public ActionResult Search(string name)
        {
            var message = Server.HtmlEncode(name);

            // We set [customErrors = on] in web.config which shows users a "prettier" error page.
            // This is more secure than showing a stacktrace 
            throw new Exception("Exception"); 


            // Returns message variable as a content for page
            return Content(message);


            // Redirects to Home page and calls Index ation with {name} parameter in query string
            //return RedirectToAction("Index", "Home", new { name = name});
            
            // Redirects to Home/About page
            //return RedirectToRoute("Default", new { controller = "Home", action = "About" });

            // Returns a website's site.css file contents
            //return File(Server.MapPath("~/Content/site.css"), "text/css");

            // Returns a JSON object whose contents are then displayed on screen
            //return Json(new { Message = message, Name = "Jon" }, JsonRequestBehavior.AllowGet);
        }

    }
}
