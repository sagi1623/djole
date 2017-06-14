using BookingApp.Hubs;
using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{   
    [RoutePrefix("api")]
    public class AccommodationController : ApiController
    {
        private BAContext db = new BAContext();

        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET api/<controller>
        [HttpGet]
        [EnableQuery]
        [Route("Accommodations")]
        public IQueryable<Accommodation> GetAccommodations()
        {
            return db.Accommodations;
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult GetAccommodation(int id)
        {
            Accommodation a = db.Accommodations.Find(id);
            if (a == null)
            {
                return NotFound();
            }

            return Ok(a);
        }

        // POST api/<controller>
        [HttpPost]
        [Authorize(Roles = "Manager")]
        [Route("Accommodations")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation(Accommodation a)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accommodations.Add(a);
            db.SaveChanges();
            AccommodationNotificationHub.AccommodationAdded(a);
            return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = a.Id }, a);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Authorize(Roles = "Manager")]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodation(int id, Accommodation a)
        {

            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != a.Id)
            {
                return BadRequest();
            }

            if (a.AppUserId != userId)
            {
                return Unauthorized();
            }

            db.Entry(a).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        [Authorize(Roles = "Manager")]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {

            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            Accommodation a = db.Accommodations.Find(id);
            if (a == null)
            {
                return NotFound();
            }

            if (a.AppUserId != userId)
            {
                return Unauthorized();
            }

            db.Accommodations.Remove(a);
            db.SaveChanges();

            return Ok(a);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }
    }
}