namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cao : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Accommodations", name: "AccomodationTypeId", newName: "AccommodationTypeId");
            RenameIndex(table: "dbo.Accommodations", name: "IX_AccomodationTypeId", newName: "IX_AccommodationTypeId");
            AlterColumn("dbo.Accommodations", "Latitude", c => c.Double());
            AlterColumn("dbo.Accommodations", "Longitude", c => c.Double());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Accommodations", "Longitude", c => c.Double(nullable: false));
            AlterColumn("dbo.Accommodations", "Latitude", c => c.Double(nullable: false));
            RenameIndex(table: "dbo.Accommodations", name: "IX_AccommodationTypeId", newName: "IX_AccomodationTypeId");
            RenameColumn(table: "dbo.Accommodations", name: "AccommodationTypeId", newName: "AccomodationTypeId");
        }
    }
}
