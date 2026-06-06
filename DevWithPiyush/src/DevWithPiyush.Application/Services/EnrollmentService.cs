using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Enums;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;


namespace DevWithPiyush.Application.Services;

public class EnrollmentService : IEnrollmentService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly string _webRootPath;

    public EnrollmentService(IUnitOfWork unitOfWork, string webRootPath)
    {
        _unitOfWork = unitOfWork;
        _webRootPath = webRootPath;
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
        // Deprecated: HTML/CSS certificate view is now used instead.
        return await Task.FromResult<byte[]?>(null);
    }

    public async Task<Certificate?> GetOrCreateCertificateAsync(int enrollmentId, string userId)
    {
        var enrollment = await _unitOfWork.Enrollments
            .Query()
            .Include(e => e.Course)
            .Include(e => e.User)
            .FirstOrDefaultAsync(e => e.Id == enrollmentId && e.UserId == userId);

        if (enrollment == null || enrollment.Status != EnrollmentStatus.Completed || !enrollment.Course.IssuesCertificate)
            return null;

        var existingCert = await _unitOfWork.Certificates
            .FirstOrDefaultAsync(c => c.EnrollmentId == enrollmentId);

        if (existingCert != null)
            return existingCert;

        string studentName = enrollment.User.FullName;
        string programName = enrollment.Course.Title;
        DateTime completedDate = enrollment.CompletedAt ?? DateTime.UtcNow;
        string certificateId = "DWPCERT-" + Guid.NewGuid().ToString("N")[..8].ToUpper();

        var certificate = new Certificate
        {
            EnrollmentId = enrollmentId,
            StudentName = studentName,
            ProgramName = programName,
            CertificateUniqueId = certificateId,
            CompletionDate = completedDate,
            GeneratedAt = DateTime.UtcNow
        };

        await _unitOfWork.Certificates.AddAsync(certificate);
        await _unitOfWork.SaveChangesAsync();

        return certificate;
    }

    public async Task<Certificate?> GetCertificateByUniqueIdAsync(string uniqueId)
    {
        return await _unitOfWork.Certificates
            .Query()
            .Include(c => c.Enrollment)
            .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(c => c.CertificateUniqueId == uniqueId);
    }


    public async Task<bool> IsEnrolledAsync(string userId, int courseId)
    {
        return await _unitOfWork.Enrollments
            .FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId) != null;
    }

    public async Task<bool> TrackLessonProgressAsync(string userId, int lessonId)
    {
        var existing = await _unitOfWork.LessonProgresses
            .FirstOrDefaultAsync(lp => lp.UserId == userId && lp.LessonId == lessonId);

        if (existing == null)
        {
            var progress = new LessonProgress
            {
                UserId = userId,
                LessonId = lessonId,
                WatchedAt = DateTime.UtcNow
            };
            await _unitOfWork.LessonProgresses.AddAsync(progress);
            await _unitOfWork.SaveChangesAsync();
        }

        return true;
    }

    public async Task<List<int>> GetCompletedLessonIdsAsync(string userId, int courseId)
    {
        return await _unitOfWork.LessonProgresses
            .Query()
            .Where(lp => lp.UserId == userId && lp.Lesson.Section.CourseId == courseId)
            .Select(lp => lp.LessonId)
            .ToListAsync();
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
        CourseSlug = e.Course?.Slug ?? "",
        Status = e.Status,
        ProgressPercent = e.ProgressPercent,
        IssuesCertificate = e.Course?.IssuesCertificate ?? false,
        EnrolledAt = e.EnrolledAt,
        CompletedAt = e.CompletedAt
    };
}
