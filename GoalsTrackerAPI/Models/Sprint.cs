using System.ComponentModel.DataAnnotations;

namespace GoalsTrackerAPI.Models
{
    public class Sprint
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Foreign keys
        public int? YearId { get; set; }
        public Year Year { get; set; }

        // Navigation property
        public ICollection<Goal> Goals { get; set; }
    }
}

