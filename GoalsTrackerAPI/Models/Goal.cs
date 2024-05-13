using System.ComponentModel.DataAnnotations;

namespace GoalsTrackerAPI.Models
{
    public class Goal
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Foreign keys
        public int? YearId { get; set; }
        public Year Year { get; set; }

        // Navigation properties
        public ICollection<Area> Areas { get; set; }
        public ICollection<Action> Actions { get; set; }
        public ICollection<Sprint> Sprints { get; set; }
    }
}
