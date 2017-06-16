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
			bool added = false;
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
								added = true;
                            }
                        }
                    }
                }
            }
			if(added)
			{
			int? average = 0;

            Accommodation a = db.Accommodations.Where(x => x.Id == comment.AccommodationId).FirstOrDefault();
            List<Comment> comments = db.Comments.Where(x => x.AccommodationId == comment.AccommodationId).ToList();
            foreach (Comment c in comments)
            {
                if (c.Grade != null)
                {
                    average += c.Grade;
                }      
            }
            average += comment.Grade;
            a.AverageGrade = Math.Floor((decimal)(average / (comments.Count + 1)));
            db.Entry(a).State = EntityState.Modified;
            db.Entry(comment).State = EntityState.Added;
			}
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

            //var role = db.Roles.Where(x => x.Name.Equals("Manager")).FirstOrDefault();

            //List<AppUser> appUser = new List<AppUser>();
            //foreach (var usy in role.Users)
            //{
            //    var manager = this.UserManager.Users.Where(x => x.Id.Equals(usy.UserId)).FirstOrDefault();
            //    appUser.Add(db.AppUsers.Where(x => x.Id == manager.appUserId).FirstOrDefault());
            //}

            int? userId = (user as BAIdentityUser).appUserId;

            Comment comment = db.Comments.Find(accId, appId);
            if (comment == null)
            {
                return NotFound();
            }

            if (comment.CustomerId != userId)
            {
                return Unauthorized();
            }

            int? average = 0;

            db.Comments.Remove(comment);
            db.SaveChanges();

            Accommodation a = db.Accommodations.Where(x => x.Id == comment.AccommodationId).FirstOrDefault();
            List<Comment> comments = db.Comments.Where(x => x.AccommodationId == comment.AccommodationId).ToList();
            foreach (Comment c in comments)
            {
                if (c.Grade != null)
                {
                    average += c.Grade;
                }
            }
            if (comments.Count == 0)
            {
                a.AverageGrade = 0;
            }
            else
            {
                a.AverageGrade = Math.Floor((decimal)(average / (comments.Count)));
            }  
            db.Entry(a).State = EntityState.Modified;
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
