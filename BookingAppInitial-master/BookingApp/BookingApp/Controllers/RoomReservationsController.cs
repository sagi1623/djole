﻿using BookingApp.Models;
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
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

        private ApplicationUserManager _userManager;

        private static object LockObj = new object();

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
        [Route("RoomReservations")]
        public IQueryable<RoomReservation> GetRoomReservations()
        {
            return db.RoomReservations;
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult GetRoomReservation(int id)
        {
            RoomReservation rr = db.RoomReservations.Find(id);
            if (rr == null)
            {
                return NotFound();
            }

            return Ok(rr);
        }

        // POST api/<controller>
        [HttpPost]
        [Authorize(Roles = "AppUser")]
        [Route("RoomReservations")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult PostRoomReservation(RoomReservation rr)
        {
            lock (LockObj)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if((DateTime)rr.EndDate < (DateTime)rr.StartDate)
                {
                    return BadRequest();
                }

                List<RoomReservation> reservations = db.RoomReservations.Where(x => x.RoomId.Equals(rr.RoomId)).ToList();
                bool alreadyReserved = false;

                foreach (RoomReservation romyReservy in reservations)
                {
                    if (romyReservy.Canceled != null)
                    {
                        if (!(bool)romyReservy.Canceled)
                        {
                            if (romyReservy.EndDate != null && romyReservy.StartDate != null)
                            {
                                if ((DateTime)romyReservy.EndDate >= (DateTime)rr.StartDate && (DateTime)romyReservy.StartDate <= (DateTime)rr.StartDate
                                    || (DateTime)romyReservy.EndDate <= (DateTime)rr.EndDate && (DateTime)romyReservy.StartDate >= (DateTime)rr.EndDate)
                                {
                                    alreadyReserved = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (alreadyReserved)
                {
                    return BadRequest();
                }

                db.RoomReservations.Add(rr);
                db.SaveChanges();

            }
            return CreatedAtRoute("DefaultApi", new { controller = "RoomReservations", id = rr.Id }, rr);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Authorize(Roles = "AppUser")]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomReservation(int id, RoomReservation rr)
        {
            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rr.Id)
            {
                return BadRequest();
            }

            if (rr.AppUserId != userId)
            {
                return Unauthorized();
            }


            db.Entry(rr).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationExists(id))
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
        [Authorize(Roles = "AppUser")]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult DeleteRoomReservation(int id)
        {
            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            RoomReservation rr = db.RoomReservations.Find(id);
            if (rr == null)
            {
                return NotFound();
            }

            if (rr.AppUserId != userId)
            {
                return Unauthorized();
            }

            db.RoomReservations.Remove(rr);
            db.SaveChanges();

            return Ok(rr);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationExists(int id)
        {
            return db.RoomReservations.Count(e => e.Id == id) > 0;
        }
    }
}