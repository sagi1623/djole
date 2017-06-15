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
            //hubContext.Clients.Group("Admins").accommodationAddedNotification(a);
            hubContext.Clients.All.accommodationAddedNotification(a);
        }

        public override Task OnConnected()
        {
            //Ako vam treba pojedinacni User
            //var identityName = Context.User.Identity.Name;

            //Groups.Add(Context.ConnectionId, "Admins");

            ////if (Context.User.IsInRole("Admin"))
            ////{
            ////    Groups.Add(Context.ConnectionId, "Admins");
            ////}          

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            //Groups.Remove(Context.ConnectionId, "Admins");

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Remove(Context.ConnectionId, "Admins");
            //}

            return base.OnDisconnected(stopCalled);
        }

    }
}