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
    public class RoomController : ApiController
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
        [Route("Rooms")]
        public IQueryable<Room> GetRooms()
        {
            return db.Rooms;
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult GetRoom(int id)
        {
            Room r = db.Rooms.Find(id);
            if (r == null)
            {
                return NotFound();
            }

            return Ok(r);
        }

        // POST api/<controller>
        [HttpPost]
        [Authorize(Roles = "Manager")]
        [Route("Rooms")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom(Room r)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Accommodation a = db.Accommodations.Where((x) => x.Id.Equals(r.AccommodationId)).FirstOrDefault();

            AppUser manager = db.AppUsers.Where((x) => x.Id.Equals(a.AppUserId)).FirstOrDefault();
            if ((manager == null) || (manager.Banned))
            {
                return Unauthorized();
            }

            db.Rooms.Add(r);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Room", id = r.Id }, r);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Authorize(Roles = "Manager")]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoom(int id, Room r)
        {
            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != r.Id)
            {
                return BadRequest();
            }

            Accommodation a = db.Accommodations.Where((x) => x.Id.Equals(r.AccommodationId)).FirstOrDefault();
            if (a.AppUserId != userId)
            {
                return Unauthorized();
            }

            AppUser manager = db.AppUsers.Where((x) => x.Id.Equals(a.AppUserId)).FirstOrDefault();
            if ((manager == null) || (manager.Banned))
            {
                return Unauthorized();
            }

            db.Entry(r).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            Room r = db.Rooms.Find(id);
            if (r == null)
            {
                return NotFound();
            }

            Accommodation a = db.Accommodations.Where((x) => x.Id.Equals(r.AccommodationId)).FirstOrDefault();

            if (a.AppUserId != userId)
            {
                return Unauthorized();
            }

            AppUser manager = db.AppUsers.Where((x) => x.Id.Equals(a.AppUserId)).FirstOrDefault();
            if ((manager == null) || (manager.Banned))
            {
                return Unauthorized();
            }

            db.Rooms.Remove(r);
            db.SaveChanges();

            return Ok(r);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.Id == id) > 0;
        }
    }
}