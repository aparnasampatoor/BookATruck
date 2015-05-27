using System.Data.Entity;
using System.Linq;
using AbhiDurandal.Models;

namespace BookATruck.Models
{
    public class BookTruckDbContext : DbContext
    {
        public BookTruckDbContext(): base("DefaultConnection")
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<BookTruckDbContext>());
            //Database.SetInitializer<BookTruckDbContext>(null);

        }

        public DbSet<Route> Routes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new RouteMap());
        }

        public override int SaveChanges()
        {
            var addedEntries = this.ChangeTracker.Entries().Where(x => x.State == EntityState.Added);

            //foreach (var entry in addedEntries)
            //{
            //    if (entry.Entity is EntityBase)
            //    {
            //        var entitybase = entry.Entity as EntityBase;

            //        entitybase.Created = DateTime.Now;
            //        entitybase.Modified = DateTime.Now;
            //    }
            //}
            return base.SaveChanges();
        }
    }
}