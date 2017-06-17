using BookingApp.Hubs;
using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
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
        public IHttpActionResult PostAccommodation()
        {
            Accommodation a = new Accommodation();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var httpRequest = HttpContext.Current.Request;
            a = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);

            AppUser manager = db.AppUsers.Where((x) => x.Id.Equals(a.AppUserId)).FirstOrDefault();
            if ((manager == null) || (manager.Banned))
            {
                return Unauthorized();
            }

            foreach (string file in httpRequest.Files)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                var postedFile = httpRequest.Files[file];
                if (postedFile != null && postedFile.ContentLength > 0)
                {
                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                    var extension = ext.ToLower();
                    if (!AllowedFileExtensions.Contains(extension))
                    {
                        return BadRequest();
                    }
                    else
                    {
                        var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                        a.ImageUrl = "Content/AccommodationPictures/" + postedFile.FileName;
                        postedFile.SaveAs(filePath);
                    }
                }
            }

            db.Accommodations.Add(a);
            db.SaveChanges();
            AccommodationNotificationHub.AccommodationAdded(a);
            return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = a.Id }, a);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Authorize(Roles = "Manager, Admin")]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodation(int id, Accommodation a)
        {

            IdentityUser user = this.UserManager.FindById(User.Identity.GetUserId());
            int? userId = (user as BAIdentityUser).appUserId;
            var userRole = user.Roles.First().RoleId;
            BAContext BAContext = new BAContext();
            var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != a.Id)
            {
                return BadRequest();
            }

            if (!(role.Name.Equals("Admin")) && !(role.Name.Equals("Manager")) && (a.AppUserId != userId))
            {
                return Unauthorized();
            }

            AppUser manager = db.AppUsers.Where((x) => x.Id.Equals(a.AppUserId)).FirstOrDefault();
            if ((manager == null) || (manager.Banned))
            {
                return Unauthorized();
            }

            if(role.Name.Equals("Admin"))
            {
                AccommodationNotificationHub.AccommodationApproved(a);
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

            AppUser manager = db.AppUsers.Where((x) => x.Id.Equals(a.AppUserId)).FirstOrDefault();
            if ((manager == null) || (manager.Banned))
            {
                return Unauthorized();
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