﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using BookingApp.Models;

namespace BookingApp.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using BookingApp.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Accommodation>("AccommodationOData");
    builder.EntitySet<AccommodationType>("AccommodationTypes"); 
    builder.EntitySet<AppUser>("AppUsers"); 
    builder.EntitySet<Comment>("Comments"); 
    builder.EntitySet<Place>("Places"); 
    builder.EntitySet<Room>("Rooms"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class AccommodationODataController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/AccommodationOData
        [EnableQuery]
        public IQueryable<Accommodation> GetAccommodationOData()
        {
            return db.Accommodations;
        }

        // GET: odata/AccommodationOData(5)
        [EnableQuery]
        public SingleResult<Accommodation> GetAccommodation([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(accommodation => accommodation.Id == key));
        }

        // GET: odata/AccommodationOData(5)/AccommodationType
        [EnableQuery]
        public SingleResult<AccommodationType> GetAccommodationType([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(m => m.Id == key).Select(m => m.AccommodationType));
        }

        // GET: odata/AccommodationOData(5)/AppUser
        [EnableQuery]
        public SingleResult<AppUser> GetAppUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(m => m.Id == key).Select(m => m.AppUser));
        }

        // GET: odata/AccommodationOData(5)/Comments
        [EnableQuery]
        public IQueryable<Comment> GetComments([FromODataUri] int key)
        {
            return db.Accommodations.Where(m => m.Id == key).SelectMany(m => m.Comments);
        }

        // GET: odata/AccommodationOData(5)/Place
        [EnableQuery]
        public SingleResult<Place> GetPlace([FromODataUri] int key)
        {
            return SingleResult.Create(db.Accommodations.Where(m => m.Id == key).Select(m => m.Place));
        }

        // GET: odata/AccommodationOData(5)/Rooms
        [EnableQuery]
        public IQueryable<Room> GetRooms([FromODataUri] int key)
        {
            return db.Accommodations.Where(m => m.Id == key).SelectMany(m => m.Rooms);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int key)
        {
            return db.Accommodations.Count(e => e.Id == key) > 0;
        }
    }
}
