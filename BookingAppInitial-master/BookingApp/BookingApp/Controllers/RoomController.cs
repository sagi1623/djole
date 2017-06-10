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
    [RoutePrefix("api")]
    public class RoomController : ApiController
    {
        private BAContext db = new BAContext();

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
        //[Authorize]
        [Route("Rooms")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom(Room r)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rooms.Add(r);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Room", id = r.Id }, r);
        }

        // PUT api/<controller>/5
        [HttpPut]
        //[Authorize]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoom(int id, Room r)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != r.Id)
            {
                return BadRequest();
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
        //[Authorize]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            Room r = db.Rooms.Find(id);
            if (r == null)
            {
                return NotFound();
            }

            List<RoomReservation> roomReservations = new List<RoomReservation>();
            foreach (RoomReservation item in db.RoomReservations)
            {
                if (item.RoomId.Equals(id))
                {
                    roomReservations.Add(item);
                }
            }
            db.RoomReservations.RemoveRange(roomReservations);

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