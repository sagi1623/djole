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
    public class CommentController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("Comments")]
        public IQueryable<Comment> GetComments()
        {
            return db.Comments;
        }

        [HttpGet]
        [Route("Comments/{accId}/{appId}")]
        public IHttpActionResult GetComment(int accId, int appId)
        {
            Comment comment = db.Comments.Find(accId,appId);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpPut]
        [Route("Comments/{accId}/{appId}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComment(int accId, int appId, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if ((accId != comment.AccommodationId )|| (appId != comment.AppUserId))
            {
                return BadRequest();
            }

            db.Entry(comment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(accId,appId))
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

        [HttpPost]
        [Route("Comments")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(comment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Comment", accid = comment.AccommodationId , appId = comment.AppUserId }, comment);
        }

        [HttpDelete]
        [Route("Comments/{accId}/{appId}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int accId, int appId)
        {
            Comment comment = db.Comments.Find(accId,appId);
            if (comment == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int accId, int appId)
        {
            return db.Comments.Count(e => (e.AccommodationId == accId) &&(e.AppUserId == appId)) > 0;
        }


    }
}
