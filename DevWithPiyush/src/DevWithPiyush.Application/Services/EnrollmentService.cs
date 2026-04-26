using System.Text;
using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Enums;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Application.Services;

public class EnrollmentService : IEnrollmentService
{
    private readonly IUnitOfWork _unitOfWork;

    public EnrollmentService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<(bool Success, string Message)> EnrollStudentAsync(string userId, int courseId)
    {
        // Check duplicate enrollment
        var existing = await _unitOfWork.Enrollments
            .FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);

        if (existing != null)
            return (false, "You are already enrolled in this course.");

        // Verify course exists and is published
        var course = await _unitOfWork.Courses.GetByIdAsync(courseId);
        if (course == null || !course.IsPublished)
            return (false, "Course not found or not available.");

        var enrollment = new Enrollment
        {
            UserId = userId,
            CourseId = courseId,
            Status = EnrollmentStatus.Enrolled,
            ProgressPercent = 0,
            EnrolledAt = DateTime.UtcNow
        };

        await _unitOfWork.Enrollments.AddAsync(enrollment);
        await _unitOfWork.SaveChangesAsync();

        return (true, "Successfully enrolled! Start learning now.");
    }

    public async Task<IEnumerable<EnrollmentDto>> GetStudentEnrollmentsAsync(string userId)
    {
        return await _unitOfWork.Enrollments
            .Query()
            .Include(e => e.Course)
            .Include(e => e.User)
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.EnrolledAt)
            .Select(e => MapToDto(e))
            .ToListAsync();
    }

    public async Task<IEnumerable<EnrollmentDto>> GetAllEnrollmentsAsync()
    {
        return await _unitOfWork.Enrollments
            .Query()
            .Include(e => e.Course)
            .Include(e => e.User)
            .OrderByDescending(e => e.EnrolledAt)
            .Select(e => MapToDto(e))
            .ToListAsync();
    }

    public async Task<bool> UpdateProgressAsync(int enrollmentId, string userId, int percent)
    {
        var enrollment = await _unitOfWork.Enrollments
            .FirstOrDefaultAsync(e => e.Id == enrollmentId && e.UserId == userId);

        if (enrollment == null) return false;

        percent = Math.Clamp(percent, 0, 100);
        enrollment.ProgressPercent = percent;

        if (percent > 0 && percent < 100)
            enrollment.Status = EnrollmentStatus.InProgress;
        else if (percent >= 100)
        {
            enrollment.Status = EnrollmentStatus.Completed;
            enrollment.CompletedAt = DateTime.UtcNow;
        }

        _unitOfWork.Enrollments.Update(enrollment);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<byte[]?> GenerateCertificateAsync(int enrollmentId, string userId)
    {
        var enrollment = await _unitOfWork.Enrollments
            .Query()
            .Include(e => e.Course)
            .Include(e => e.User)
            .FirstOrDefaultAsync(e => e.Id == enrollmentId && e.UserId == userId);

        if (enrollment == null || enrollment.Status != EnrollmentStatus.Completed)
            return null;

        // Generate a simple text-based certificate (dummy PDF placeholder)
        // In production, use a proper PDF library like iTextSharp or QuestPDF
        var certificate = GenerateDummyCertificate(
            enrollment.User.FullName,
            enrollment.Course.Title,
            enrollment.CompletedAt ?? DateTime.UtcNow
        );

        return certificate;
    }

    public async Task<bool> IsEnrolledAsync(string userId, int courseId)
    {
        return await _unitOfWork.Enrollments
            .FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId) != null;
    }

    // ── Helpers ─────────────────────────────────────────────────

    private static EnrollmentDto MapToDto(Enrollment e) => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        StudentName = e.User?.FullName ?? "Unknown",
        StudentEmail = e.User?.Email ?? "",
        CourseId = e.CourseId,
        CourseTitle = e.Course?.Title ?? "Unknown",
        Status = e.Status,
        ProgressPercent = e.ProgressPercent,
        EnrolledAt = e.EnrolledAt,
        CompletedAt = e.CompletedAt
    };

    /// <summary>
    /// Generates a simple text file as a dummy certificate.
    /// Replace with QuestPDF or iTextSharp in production for proper PDF generation.
    /// </summary>
    private static byte[] GenerateDummyCertificate(string studentName, string courseTitle, DateTime completedDate)
    {
        var sb = new StringBuilder();
        sb.AppendLine("═══════════════════════════════════════════════════════════");
        sb.AppendLine();
        sb.AppendLine("                    CERTIFICATE OF COMPLETION");
        sb.AppendLine();
        sb.AppendLine("═══════════════════════════════════════════════════════════");
        sb.AppendLine();
        sb.AppendLine("                       DevWithPiyush");
        sb.AppendLine("                  Training & Development Platform");
        sb.AppendLine();
        sb.AppendLine("───────────────────────────────────────────────────────────");
        sb.AppendLine();
        sb.AppendLine("  This is to certify that");
        sb.AppendLine();
        sb.AppendLine($"                    {studentName}");
        sb.AppendLine();
        sb.AppendLine("  has successfully completed the course");
        sb.AppendLine();
        sb.AppendLine($"                    \"{courseTitle}\"");
        sb.AppendLine();
        sb.AppendLine($"  Date of Completion: {completedDate:MMMM dd, yyyy}");
        sb.AppendLine();
        sb.AppendLine("───────────────────────────────────────────────────────────");
        sb.AppendLine();
        sb.AppendLine("  Certificate ID: DWPCERT-" + Guid.NewGuid().ToString("N")[..8].ToUpper());
        sb.AppendLine();
        sb.AppendLine("                                    Piyush");
        sb.AppendLine("                                    Founder, DevWithPiyush");
        sb.AppendLine();
        sb.AppendLine("═══════════════════════════════════════════════════════════");

        return Encoding.UTF8.GetBytes(sb.ToString());
    }
}
