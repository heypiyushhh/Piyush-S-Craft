using System.ComponentModel.DataAnnotations;
using DevWithPiyush.Domain.Enums;

namespace DevWithPiyush.Application.DTOs;

public class CourseDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Course title is required.")]
    [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters.")]
    public string Title { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    [Required(ErrorMessage = "Short description is required.")]
    [MaxLength(500, ErrorMessage = "Short description cannot exceed 500 characters.")]
    public string ShortDescription { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description is required.")]
    public string Description { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public CourseLevel Level { get; set; } = CourseLevel.Beginner;

    [Range(1, 500, ErrorMessage = "Duration must be between 1 and 500 hours.")]
    public int DurationHours { get; set; }

    [Range(0, 99999, ErrorMessage = "Price must be between 0 and 99999.")]
    public decimal Price { get; set; }

    public bool IsPublished { get; set; }

    public DateTime CreatedAt { get; set; }
    public int EnrollmentCount { get; set; }
}
