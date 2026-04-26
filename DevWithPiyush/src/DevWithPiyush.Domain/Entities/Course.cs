using System.ComponentModel.DataAnnotations;
using DevWithPiyush.Domain.Enums;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Represents a training course offered on the platform.
/// Slug is auto-generated from Title for SEO-friendly URLs.
/// </summary>
public class Course
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Slug { get; set; } = string.Empty;

    [MaxLength(500)]
    public string ShortDescription { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public CourseLevel Level { get; set; } = CourseLevel.Beginner;

    public int DurationHours { get; set; }

    public decimal Price { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
