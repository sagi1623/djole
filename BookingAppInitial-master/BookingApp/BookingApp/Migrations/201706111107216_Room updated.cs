namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Roomupdated : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Rooms", name: "AccomodationId", newName: "AccommodationId");
            RenameIndex(table: "dbo.Rooms", name: "IX_AccomodationId", newName: "IX_AccommodationId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Rooms", name: "IX_AccommodationId", newName: "IX_AccomodationId");
            RenameColumn(table: "dbo.Rooms", name: "AccommodationId", newName: "AccomodationId");
        }
    }
}
