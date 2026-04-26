using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Enums;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<ApplicationUser> _userManager;

    public DashboardService(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager)
    {
        _unitOfWork = unitOfWork;
        _userManager = userManager;
    }

    public async Task<AdminDashboardDto> GetAdminDashboardAsync()
    {
        var totalCourses = await _unitOfWork.Courses.CountAsync();
        var studentsInRole = await _userManager.GetUsersInRoleAsync("Student");
        var totalEnrollments = await _unitOfWork.Enrollments.CountAsync();
        var unreadQueries = await _unitOfWork.ContactQueries.CountAsync(q => !q.IsRead);

        var recentEnrollments = await _unitOfWork.Enrollments
            .Query()
            .Include(e => e.Course)
            .Include(e => e.User)
            .OrderByDescending(e => e.EnrolledAt)
            .Take(10)
            .Select(e => new EnrollmentDto
            {
                Id = e.Id,
                UserId = e.UserId,
                StudentName = e.User.FullName,
                StudentEmail = e.User.Email ?? "",
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                Status = e.Status,
                ProgressPercent = e.ProgressPercent,
                EnrolledAt = e.EnrolledAt,
                CompletedAt = e.CompletedAt
            })
            .ToListAsync();

        return new AdminDashboardDto
        {
            TotalCourses = totalCourses,
            TotalStudents = studentsInRole.Count,
            TotalEnrollments = totalEnrollments,
            UnreadQueries = unreadQueries,
            RecentEnrollments = recentEnrollments
        };
    }

    public async Task<StudentDashboardDto> GetStudentDashboardAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        var enrollments = await _unitOfWork.Enrollments
            .Query()
            .Include(e => e.Course)
            .Include(e => e.User)
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.EnrolledAt)
            .Select(e => new EnrollmentDto
            {
                Id = e.Id,
                UserId = e.UserId,
                StudentName = e.User.FullName,
                StudentEmail = e.User.Email ?? "",
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                Status = e.Status,
                ProgressPercent = e.ProgressPercent,
                EnrolledAt = e.EnrolledAt,
                CompletedAt = e.CompletedAt
            })
            .ToListAsync();

        return new StudentDashboardDto
        {
            StudentName = user?.FullName ?? "Student",
            TotalEnrolled = enrollments.Count,
            InProgress = enrollments.Count(e => e.Status == EnrollmentStatus.InProgress),
            Completed = enrollments.Count(e => e.Status == EnrollmentStatus.Completed),
            Enrollments = enrollments
        };
    }

    public async Task<IEnumerable<StudentDto>> GetAllStudentsAsync()
    {
        var students = await _userManager.GetUsersInRoleAsync("Student");

        var studentDtos = new List<StudentDto>();
        foreach (var student in students)
        {
            var enrolledCount = await _unitOfWork.Enrollments
                .CountAsync(e => e.UserId == student.Id);

            studentDtos.Add(new StudentDto
            {
                Id = student.Id,
                FullName = student.FullName,
                Email = student.Email ?? "",
                CreatedAt = student.CreatedAt,
                EnrolledCourses = enrolledCount
            });
        }

        return studentDtos.OrderByDescending(s => s.CreatedAt);
    }
}
