using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Portfolio project displayed on the public site.
/// Technologies stored as comma-separated string for simplicity.
/// </summary>
public class Project
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    [MaxLength(500)]
    public string? LiveUrl { get; set; }

    [MaxLength(500)]
    public string? GitHubUrl { get; set; }

    /// <summary>Comma-separated list of technologies (e.g. "C#, ASP.NET Core, SQL Server")</summary>
    [MaxLength(500)]
    public string Technologies { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsVisible { get; set; } = true;
}
