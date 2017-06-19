using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using BookingApp.Models;

namespace BookingApp.Hubs
{
    [HubName("AccommodationNotification")]
    public class AccommodationNotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<AccommodationNotificationHub>();

        public static void AccommodationAdded(Accommodation a)
        {
            hubContext.Clients.Group("Admin").accommodationAddedNotification(new Accommodation() { Name = a.Name, Id = a.Id});
            //hubContext.Clients.All.accommodationAddedNotification(a);
        }

        public static void AccommodationApproved(Accommodation a)
        {
            hubContext.Clients.Group(a.AppUserId.ToString()).accommodationApprovedNotification(new Accommodation() { Name = a.Name, Id = a.Id });
        }

        public void RegisterToRole(string Role, string id)
        {
            if (Context.User != null)
            {
                Groups.Add(Context.ConnectionId, Role);
                if(Role.Equals("Manager"))
                {
                    Groups.Add(Context.ConnectionId, id);
                }
            }
        }

        public override Task OnConnected()
        {
            //Ako vam treba pojedinacni User
            //var identityName = Context.User.Identity.Name;

            //Groups.Add(Context.ConnectionId, "Admins");

            //if (Context.User != null)
            //{
            //    if (Context.User.IsInRole("Admin"))
            //    {
            //        Groups.Add(Context.ConnectionId, "Admins");
            //    }
            //}
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            //Groups.Remove(Context.ConnectionId, "Admins");
            //if (Context.User != null)
            //{
            //    if (Context.User.IsInRole("Admin"))
            //    {
            //        Groups.Remove(Context.ConnectionId, "Admins");
            //    }
            //}
            return base.OnDisconnected(stopCalled);
        }

    }
}