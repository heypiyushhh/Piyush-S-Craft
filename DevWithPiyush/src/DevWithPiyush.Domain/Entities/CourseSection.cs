using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

public class CourseSection
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public int Order { get; set; }

    public int CourseId { get; set; }
    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
