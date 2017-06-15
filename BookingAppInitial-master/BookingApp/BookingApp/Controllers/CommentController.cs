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
    public class CommentController : ApiController
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
        [Authorize(Roles = "AppUser")]
        [Route("Comments/{accId}/{appId}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComment(int accId, int appId, Comment comment)
        {
            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if ((accId != comment.AccommodationId )|| (appId != comment.CustomerId))
            {
                return BadRequest();
            }

            if (comment.CustomerId != userId)
            {
                return Unauthorized();
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
        [Authorize(Roles = "AppUser")]
        [Route("Comments")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Accommodation a = db.Accommodations.Where((x) => x.Id.Equals(comment.AccommodationId)).FirstOrDefault();
            if (a != null)
            {
                Room r = db.Rooms.Where((x) => x.AccommodationId.Equals(a.Id)).FirstOrDefault();
                if (r != null)
                {
                    RoomReservation rr = db.RoomReservations.Where((x) => x.RoomId.Equals(r.Id)).FirstOrDefault();
                    if (rr != null)
                    {
                        if (rr.AppUserId.Equals(comment.CustomerId))
                        {
                            if (rr.StartDate < DateTime.Now)
                            {
                                db.Comments.Add(comment);
                            }
                        }
                    }
                }
            }

            //db.Comments.Add(comment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Comment", accid = comment.AccommodationId , appId = comment.CustomerId }, comment);
        }

        [HttpDelete]
        [Authorize(Roles = "AppUser")]
        [Route("Comments/{accId}/{appId}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int accId, int appId)
        {
            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());

            int? userId = (user as BAIdentityUser).appUserId;

            Comment comment = db.Comments.Find(accId,appId);
            if (comment == null)
            {
                return NotFound();
            }

            if (comment.CustomerId != userId)
            {
                return Unauthorized();
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
            return db.Comments.Count(e => (e.AccommodationId == accId) &&(e.CustomerId == appId)) > 0;
        }


    }
}
