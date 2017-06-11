namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialmodel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AccommodationTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        AccommodationId = c.Int(nullable: false),
                        AppUserId = c.Int(nullable: false),
                        Grade = c.Int(nullable: true),
                        Text = c.String(maxLength: 1024),
                    })
                .PrimaryKey(t => new { t.AccommodationId, t.AppUserId })
                .ForeignKey("dbo.Accommodations", t => t.AccommodationId, cascadeDelete: true)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: false)
                .Index(t => t.AccommodationId)
                .Index(t => t.AppUserId);
            
            CreateTable(
                "dbo.RoomReservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        Timestamp = c.Binary(nullable: true, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        AppUserId = c.Int(nullable: false),
                        RoomId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: false)
                .ForeignKey("dbo.Rooms", t => t.RoomId, cascadeDelete: true)
                .Index(t => t.AppUserId)
                .Index(t => t.RoomId);
            
            CreateTable(
                "dbo.Rooms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoomNumber = c.Int(nullable: false),
                        BedCount = c.Int(nullable: false),
                        Description = c.String(maxLength: 1024),
                        PricePerNight = c.Decimal(nullable: false, precision: 18, scale: 2),
                        AccomodationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accommodations", t => t.AccomodationId, cascadeDelete: true)
                .Index(t => t.AccomodationId);
            
            CreateTable(
                "dbo.Places",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        RegionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Regions", t => t.RegionId, cascadeDelete: true)
                .Index(t => t.RegionId);
            
            CreateTable(
                "dbo.Regions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        CountryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Countries", t => t.CountryId, cascadeDelete: true)
                .Index(t => t.CountryId);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Code = c.String(nullable: false, maxLength: 3),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Accommodations", "AccomodationTypeId", c => c.Int(nullable: false));
            AddColumn("dbo.Accommodations", "PlaceId", c => c.Int(nullable: false));
            AddColumn("dbo.Accommodations", "AppUserId", c => c.Int(nullable: false));
            AddColumn("dbo.AppUsers", "FirstName", c => c.String(nullable: false, maxLength: 256));
            AddColumn("dbo.AppUsers", "LastName", c => c.String(nullable: false, maxLength: 256));
            CreateIndex("dbo.Accommodations", "AccomodationTypeId");
            CreateIndex("dbo.Accommodations", "PlaceId");
            CreateIndex("dbo.Accommodations", "AppUserId");
            AddForeignKey("dbo.Accommodations", "AccomodationTypeId", "dbo.AccommodationTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Accommodations", "AppUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places", "Id", cascadeDelete: true);
            DropColumn("dbo.AppUsers", "FullName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "FullName", c => c.Int(nullable: false));
            DropForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places");
            DropForeignKey("dbo.Places", "RegionId", "dbo.Regions");
            DropForeignKey("dbo.Regions", "CountryId", "dbo.Countries");
            DropForeignKey("dbo.Accommodations", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.RoomReservations", "RoomId", "dbo.Rooms");
            DropForeignKey("dbo.Rooms", "AccomodationId", "dbo.Accommodations");
            DropForeignKey("dbo.RoomReservations", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "AccommodationId", "dbo.Accommodations");
            DropForeignKey("dbo.Accommodations", "AccomodationTypeId", "dbo.AccommodationTypes");
            DropIndex("dbo.Regions", new[] { "CountryId" });
            DropIndex("dbo.Places", new[] { "RegionId" });
            DropIndex("dbo.Rooms", new[] { "AccomodationId" });
            DropIndex("dbo.RoomReservations", new[] { "RoomId" });
            DropIndex("dbo.RoomReservations", new[] { "AppUserId" });
            DropIndex("dbo.Comments", new[] { "AppUserId" });
            DropIndex("dbo.Comments", new[] { "AccommodationId" });
            DropIndex("dbo.Accommodations", new[] { "AppUserId" });
            DropIndex("dbo.Accommodations", new[] { "PlaceId" });
            DropIndex("dbo.Accommodations", new[] { "AccomodationTypeId" });
            DropColumn("dbo.AppUsers", "LastName");
            DropColumn("dbo.AppUsers", "FirstName");
            DropColumn("dbo.Accommodations", "AppUserId");
            DropColumn("dbo.Accommodations", "PlaceId");
            DropColumn("dbo.Accommodations", "AccomodationTypeId");
            DropTable("dbo.Countries");
            DropTable("dbo.Regions");
            DropTable("dbo.Places");
            DropTable("dbo.Rooms");
            DropTable("dbo.RoomReservations");
            DropTable("dbo.Comments");
            DropTable("dbo.AccommodationTypes");
        }
    }
}
