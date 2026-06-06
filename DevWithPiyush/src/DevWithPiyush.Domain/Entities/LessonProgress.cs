using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

public class LessonProgress
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;
    public virtual ApplicationUser User { get; set; } = null!;

    public int LessonId { get; set; }
    public virtual Lesson Lesson { get; set; } = null!;

    public DateTime WatchedAt { get; set; } = DateTime.UtcNow;
}
