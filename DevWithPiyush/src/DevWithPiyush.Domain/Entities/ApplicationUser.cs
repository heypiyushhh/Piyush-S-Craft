using Microsoft.AspNetCore.Identity;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Extended Identity user with profile fields.
/// Inherits all standard Identity columns (Email, PasswordHash, etc.)
/// </summary>
public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;

    public string? AvatarUrl { get; set; }

    public string? Bio { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
