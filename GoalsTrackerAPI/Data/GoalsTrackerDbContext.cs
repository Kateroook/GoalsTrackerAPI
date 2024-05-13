using GoalsTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;
using Action = GoalsTrackerAPI.Models.Action;

namespace GoalsTrackerAPI.Data
{
    public class GoalsTrackerDbContext : DbContext
    {
        public GoalsTrackerDbContext(DbContextOptions<GoalsTrackerDbContext> options)
            : base(options)
        {
        }

        public DbSet<Action> Actions { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Habit> Habits { get; set; }
        public DbSet<Sprint> Sprints { get; set; }
        public DbSet<Year> Years { get; set; }
    }
}
