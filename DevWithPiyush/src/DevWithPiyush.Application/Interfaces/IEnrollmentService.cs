using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Application.Interfaces;

public interface IEnrollmentService
{
    Task<(bool Success, string Message)> EnrollStudentAsync(string userId, int courseId);
    Task<IEnumerable<EnrollmentDto>> GetStudentEnrollmentsAsync(string userId);
    Task<IEnumerable<EnrollmentDto>> GetAllEnrollmentsAsync();
    Task<bool> UpdateProgressAsync(int enrollmentId, string userId, int percent);
    Task<byte[]?> GenerateCertificateAsync(int enrollmentId, string userId);
    Task<bool> IsEnrolledAsync(string userId, int courseId);
}
