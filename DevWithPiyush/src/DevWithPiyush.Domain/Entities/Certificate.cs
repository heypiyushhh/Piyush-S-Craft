using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Stores a record of each generated certificate.
/// Links to the Enrollment that was completed.
/// CertificateUniqueId is the human-readable code printed on the certificate (e.g., DWPCERT-9B24CDF7).
/// </summary>
public class Certificate
{
    public int Id { get; set; }

    [Required]
    public int EnrollmentId { get; set; }

    [Required, MaxLength(200)]
    public string StudentName { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string ProgramName { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string CertificateUniqueId { get; set; } = string.Empty;

    public DateTime CompletionDate { get; set; }

    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public virtual Enrollment Enrollment { get; set; } = null!;
}
