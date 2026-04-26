using System.ComponentModel.DataAnnotations;

namespace DevWithPiyush.Domain.Entities;

/// <summary>
/// Stores contact form submissions from visitors.
/// Admin can mark queries as read from the dashboard.
/// </summary>
public class ContactQuery
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(200), EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required, MaxLength(2000)]
    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}
