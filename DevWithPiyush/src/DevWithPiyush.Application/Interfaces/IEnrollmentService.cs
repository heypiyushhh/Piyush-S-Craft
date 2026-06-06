using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Domain.Entities;

namespace DevWithPiyush.Application.Interfaces;

public interface IEnrollmentService
{
    Task<(bool Success, string Message)> EnrollStudentAsync(string userId, int courseId);
    Task<IEnumerable<EnrollmentDto>> GetStudentEnrollmentsAsync(string userId);
    Task<IEnumerable<EnrollmentDto>> GetAllEnrollmentsAsync();
    Task<bool> UpdateProgressAsync(int enrollmentId, string userId, int percent);
    Task<byte[]?> GenerateCertificateAsync(int enrollmentId, string userId);
    Task<Certificate?> GetOrCreateCertificateAsync(int enrollmentId, string userId);
    Task<Certificate?> GetCertificateByUniqueIdAsync(string uniqueId);
    Task<bool> IsEnrolledAsync(string userId, int courseId);
    Task<bool> TrackLessonProgressAsync(string userId, int lessonId);
    Task<List<int>> GetCompletedLessonIdsAsync(string userId, int courseId);
}
