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

    // Curriculum Management
    Task AddSectionAsync(int courseId, string title);
    Task AddLessonAsync(int sectionId, string title, string? youtubeVideoId);
    Task DeleteSectionAsync(int sectionId);
    Task DeleteLessonAsync(int lessonId);
}
