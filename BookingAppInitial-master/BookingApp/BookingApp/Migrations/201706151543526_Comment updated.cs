namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Commentupdated : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Comments", name: "AppUserId", newName: "CustomerId");
            RenameIndex(table: "dbo.Comments", name: "IX_AppUserId", newName: "IX_CustomerId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Comments", name: "IX_CustomerId", newName: "IX_AppUserId");
            RenameColumn(table: "dbo.Comments", name: "CustomerId", newName: "AppUserId");
        }
    }
}
