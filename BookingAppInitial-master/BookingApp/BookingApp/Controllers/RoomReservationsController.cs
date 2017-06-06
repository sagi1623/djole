using BookingApp.Models;
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
    //[Authorize]
    [RoutePrefix("api")]
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

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
        [Route("RoomReservations")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult PostRoomReservation(RoomReservation rr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomReservations.Add(rr);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "RoomReservations", id = rr.Id }, rr);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomReservation(int id, RoomReservation rr)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rr.Id)
            {
                return BadRequest();
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
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult DeleteRoomReservation(int id)
        {
            RoomReservation rr = db.RoomReservations.Find(id);
            if (rr == null)
            {
                return NotFound();
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