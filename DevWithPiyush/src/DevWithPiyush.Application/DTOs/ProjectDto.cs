using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Application.DTOs;

public class ProjectDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    [MaxLength(500)]
    [Url(ErrorMessage = "Please enter a valid URL")]
    public string? LiveUrl { get; set; }

    [MaxLength(500)]
    [Url(ErrorMessage = "Please enter a valid URL")]
    public string? GitHubUrl { get; set; }

    [Required(ErrorMessage = "Technologies are required")]
    [MaxLength(500)]
    public string Technologies { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsVisible { get; set; } = true;
}
