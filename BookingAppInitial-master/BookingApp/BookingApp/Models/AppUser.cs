using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256, MinimumLength = 1)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(256, MinimumLength = 1)]
        public string LastName { get; set; }

        public List<Accommodation> Accommodations { get; set; }

        public List<Comment> Comments { get; set;}

        public List<RoomReservation> RoomReservations { get; set; }

        public bool Banned { get; set; }
    }
}