using System.ComponentModel.DataAnnotations;

namespace GoalsTrackerAPI.Models
{
    public class Area
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? CoverImageUrl { get; set; }

        // Navigation property
        public ICollection<Goal>? Goals { get; set; }
    }
}
