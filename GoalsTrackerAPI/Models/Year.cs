using System.ComponentModel.DataAnnotations;

namespace GoalsTrackerAPI.Models
{
    public class Year
    {
        [Key]
        public int Id { get; set; }
        public int YearNumber { get; set; }
        public bool IsArchived { get; set; }
        public string? CoverImageUrl { get; set; }

        // Navigation property
        public ICollection<Goal> Goals { get; set; }
        public ICollection<Sprint> Sprints { get; set; }
    }
}
