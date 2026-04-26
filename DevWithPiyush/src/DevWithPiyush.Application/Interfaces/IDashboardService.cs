using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Application.Interfaces;

public interface IDashboardService
{
    Task<AdminDashboardDto> GetAdminDashboardAsync();
    Task<StudentDashboardDto> GetStudentDashboardAsync(string userId);
    Task<IEnumerable<StudentDto>> GetAllStudentsAsync();
}
