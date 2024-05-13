using System.ComponentModel.DataAnnotations;

namespace GoalsTrackerAPI.Models
{
    public class Action
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }
        public string? Description { get; set; } 
        public bool IsCompleted { get; set; }

        // Foreign key
        public int GoalId { get; set; }

        // Navigation property
        public Goal Goal { get; set; }
    }
}
