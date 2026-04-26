using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Skill displayed with progress bar on the public site.
/// Proficiency is 0–100 representing percentage.
/// </summary>
public class Skill
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [Range(0, 100)]
    public int Proficiency { get; set; }

    public int DisplayOrder { get; set; }
}
