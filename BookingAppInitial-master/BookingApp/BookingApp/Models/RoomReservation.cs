﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservation
    {
        public int Id { get; set; }

        [Required]
        public DateTime? StartDate { get; set; }

        [Required]
        public DateTime? EndDate { get; set; }

        [Timestamp]
        public byte?[] Timestamp { get; set; }

        public AppUser AppUser { get; set; }

        [Required]
        [ForeignKey("AppUser")]
        public int AppUserId { get; set; }

        public Room Room { get; set; }

        [Required]
        [ForeignKey("Room")]
        public int RoomId { get; set; }

        public bool? Canceled { get; set; }
    }
}