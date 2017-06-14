namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomReservationupdated : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RoomReservations", "Canceled", c => c.Boolean(nullable: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RoomReservations", "Canceled");
        }
    }
}
