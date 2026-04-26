using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Application.Interfaces;

public interface ICourseService
{
    Task<IEnumerable<CourseDto>> GetPublishedCoursesAsync();
    Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
    Task<CourseDto?> GetCourseBySlugAsync(string slug);
    Task<CourseDto?> GetCourseByIdAsync(int id);
    Task<CourseDto> CreateCourseAsync(CourseDto dto);
    Task UpdateCourseAsync(CourseDto dto);
    Task DeleteCourseAsync(int id);
}
