using System.ComponentModel.DataAnnotations;

namespace GoalsTrackerAPI.Models
{
    public class Habit
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public int FrequencyPerWeek { get; set; } // 1-7 times a week

        //Foreign Key
        public int? GoalId { get; set; }

        //Navigation property
        public Goal Goal { get; set; }
    }
}
