using System.ComponentModel.DataAnnotations;
using DevWithPiyush.Domain.Enums;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Join entity between ApplicationUser and Course.
/// Tracks enrollment status and progress percentage.
/// Composite unique index on (UserId, CourseId) prevents duplicates.
/// </summary>
public class Enrollment
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = string.Empty;

    public int CourseId { get; set; }

    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.Enrolled;

    /// <summary>Progress from 0 to 100.</summary>
    [Range(0, 100)]
    public int ProgressPercent { get; set; }

    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

    public DateTime? CompletedAt { get; set; }

    // Navigation
    public virtual ApplicationUser User { get; set; } = null!;
    public virtual Course Course { get; set; } = null!;
}
