using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

public class Lesson
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string? Content { get; set; }

    [MaxLength(100)]
    public string? YouTubeVideoId { get; set; }

    public int Order { get; set; }

    public int SectionId { get; set; }
    public virtual CourseSection Section { get; set; } = null!;

    public virtual ICollection<LessonProgress> Progresses { get; set; } = new List<LessonProgress>();
}
