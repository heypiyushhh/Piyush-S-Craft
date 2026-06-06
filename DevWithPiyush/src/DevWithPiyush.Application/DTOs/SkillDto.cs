using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Application.DTOs;

public class SkillDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Skill name is required")]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Category is required")]
    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [Range(0, 100, ErrorMessage = "Proficiency must be between 0 and 100")]
    public int Proficiency { get; set; }

    public int DisplayOrder { get; set; }
}
