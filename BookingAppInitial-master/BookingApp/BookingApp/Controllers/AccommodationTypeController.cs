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

namespace BookingApp.Controllers
{
    //[Authorize]
    [RoutePrefix("api")]
    public class AccommodationTypeController : ApiController
    {
        private BAContext db = new BAContext();

        // GET api/<controller>
        [HttpGet]
        [Route("AccommodationTypes")]
        public IQueryable<AccommodationType> GetAccommodationTypes()
        {
            return db.AccommodationTypes;
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("AccommodationTypes/{id}")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult GetAccommodationType(int id)
        {
            AccommodationType at = db.AccommodationTypes.Find(id);
            if (at == null)
            {
                return NotFound();
            }

            return Ok(at);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("AccommodationTypes")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult PostAccommodationType(AccommodationType at)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccommodationTypes.Add(at);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "AccommodationType", id = at.Id }, at);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("AccommodationTypes/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodationType(int id, AccommodationType at)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != at.Id)
            {
                return BadRequest();
            }

            db.Entry(at).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationTypeExists(id))
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
        [Route("AccommodationTypes/{id}")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult DeleteAccommodationType(int id)
        {
            AccommodationType at = db.AccommodationTypes.Find(id);
            if (at == null)
            {
                return NotFound();
            }

            db.AccommodationTypes.Remove(at);
            db.SaveChanges();

            return Ok(at);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationTypeExists(int id)
        {
            return db.Rooms.Count(e => e.Id == id) > 0;
        }
    }
}