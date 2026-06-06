using System.Text.RegularExpressions;
using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Application.Services;

public class CourseService : ICourseService
{
    private readonly IUnitOfWork _unitOfWork;

    public CourseService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<CourseDto>> GetPublishedCoursesAsync()
    {
        var courses = await _unitOfWork.Courses
            .Query()
            .Where(c => c.IsPublished)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => MapToDto(c))
            .ToListAsync();

        return courses;
    }

    public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
    {
        var courses = await _unitOfWork.Courses
            .Query()
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Slug = c.Slug,
                ShortDescription = c.ShortDescription,
                Description = c.Description,
                ImageUrl = c.ImageUrl,
                Level = c.Level,
                DurationHours = c.DurationHours,
                Price = c.Price,
                IsPublished = c.IsPublished,
                IssuesCertificate = c.IssuesCertificate,
                CreatedAt = c.CreatedAt,
                EnrollmentCount = c.Enrollments.Count
            })
            .ToListAsync();

        return courses;
    }

    public async Task<CourseDto?> GetCourseBySlugAsync(string slug)
    {
        var course = await _unitOfWork.Courses
            .Query()
            .Include(c => c.Enrollments)
            .Include(c => c.Sections)
                .ThenInclude(s => s.Lessons)
            .FirstOrDefaultAsync(c => c.Slug == slug);

        return course == null ? null : MapToDto(course);
    }

    public async Task<CourseDto?> GetCourseByIdAsync(int id)
    {
        var course = await _unitOfWork.Courses
            .Query()
            .Include(c => c.Sections)
                .ThenInclude(s => s.Lessons)
            .FirstOrDefaultAsync(c => c.Id == id);
        return course == null ? null : MapToDto(course);
    }

    public async Task<CourseDto> CreateCourseAsync(CourseDto dto)
    {
        var course = new Course
        {
            Title = dto.Title,
            Slug = GenerateSlug(dto.Title),
            ShortDescription = dto.ShortDescription,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            Level = dto.Level,
            DurationHours = dto.DurationHours,
            Price = dto.Price,
            IsPublished = dto.IsPublished,
            IssuesCertificate = dto.IssuesCertificate,
            CreatedAt = DateTime.UtcNow
        };

        await _unitOfWork.Courses.AddAsync(course);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(course);
    }

    public async Task UpdateCourseAsync(CourseDto dto)
    {
        var course = await _unitOfWork.Courses.GetByIdAsync(dto.Id);
        if (course == null) throw new InvalidOperationException("Course not found.");

        course.Title = dto.Title;
        course.Slug = GenerateSlug(dto.Title);
        course.ShortDescription = dto.ShortDescription;
        course.Description = dto.Description;
        course.ImageUrl = dto.ImageUrl;
        course.Level = dto.Level;
        course.DurationHours = dto.DurationHours;
        course.Price = dto.Price;
        course.IsPublished = dto.IsPublished;
        course.IssuesCertificate = dto.IssuesCertificate;
        course.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Courses.Update(course);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteCourseAsync(int id)
    {
        var course = await _unitOfWork.Courses.GetByIdAsync(id);
        if (course == null) throw new InvalidOperationException("Course not found.");

        _unitOfWork.Courses.Delete(course);
        await _unitOfWork.SaveChangesAsync();
    }

    // ── Curriculum Management ───────────────────────────────────

    public async Task AddSectionAsync(int courseId, string title)
    {
        var lastOrder = await _unitOfWork.CourseSections.Query()
            .Where(s => s.CourseId == courseId)
            .OrderByDescending(s => s.Order)
            .Select(s => s.Order)
            .FirstOrDefaultAsync();

        var section = new CourseSection
        {
            CourseId = courseId,
            Title = title,
            Order = lastOrder + 1
        };

        await _unitOfWork.CourseSections.AddAsync(section);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task AddLessonAsync(int sectionId, string title, string? youtubeVideoId)
    {
        var lastOrder = await _unitOfWork.Lessons.Query()
            .Where(l => l.SectionId == sectionId)
            .OrderByDescending(l => l.Order)
            .Select(l => l.Order)
            .FirstOrDefaultAsync();

        var lesson = new Lesson
        {
            SectionId = sectionId,
            Title = title,
            YouTubeVideoId = ExtractYouTubeId(youtubeVideoId),
            Order = lastOrder + 1
        };

        await _unitOfWork.Lessons.AddAsync(lesson);
        await _unitOfWork.SaveChangesAsync();
    }

    private string? ExtractYouTubeId(string? input)
    {
        if (string.IsNullOrWhiteSpace(input)) return null;
        input = input.Trim();
        
        // If it's already just the ID (11 chars)
        if (input.Length == 11) return input;

        // handle youtube.com/watch?v=...
        if (input.Contains("v="))
        {
            var parts = input.Split("v=");
            if (parts.Length > 1) return parts[1].Split('&')[0];
        }

        // handle youtu.be/...
        if (input.Contains("youtu.be/"))
        {
            var parts = input.Split("youtu.be/");
            if (parts.Length > 1) return parts[1].Split('?')[0];
        }
        
        // handle youtube.com/shorts/...
        if (input.Contains("shorts/"))
        {
            var parts = input.Split("shorts/");
            if (parts.Length > 1) return parts[1].Split('?')[0];
        }

        // handle youtube.com/embed/...
        if (input.Contains("embed/"))
        {
            var parts = input.Split("embed/");
            if (parts.Length > 1) return parts[1].Split('?')[0];
        }

        return input;
    }

    public async Task DeleteSectionAsync(int sectionId)
    {
        var section = await _unitOfWork.CourseSections.GetByIdAsync(sectionId);
        if (section != null)
        {
            _unitOfWork.CourseSections.Delete(section);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    public async Task DeleteLessonAsync(int lessonId)
    {
        var lesson = await _unitOfWork.Lessons.GetByIdAsync(lessonId);
        if (lesson != null)
        {
            _unitOfWork.Lessons.Delete(lesson);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    // ── Helpers ─────────────────────────────────────────────────

    private static CourseDto MapToDto(Course c) => new()
    {
        Id = c.Id,
        Title = c.Title,
        Slug = c.Slug,
        ShortDescription = c.ShortDescription,
        Description = c.Description,
        ImageUrl = c.ImageUrl,
        Level = c.Level,
        DurationHours = c.DurationHours,
        Price = c.Price,
        IsPublished = c.IsPublished,
        IssuesCertificate = c.IssuesCertificate,
        CreatedAt = c.CreatedAt,
        EnrollmentCount = c.Enrollments?.Count ?? 0,
        Sections = c.Sections?.OrderBy(s => s.Order).Select(s => new SectionDto
        {
            Id = s.Id,
            Title = s.Title,
            Order = s.Order,
            Lessons = s.Lessons?.OrderBy(l => l.Order).Select(l => new LessonDto
            {
                Id = l.Id,
                Title = l.Title,
                YouTubeVideoId = l.YouTubeVideoId,
                Order = l.Order
            }).ToList() ?? new()
        }).ToList() ?? new()
    };

    private static string GenerateSlug(string title)
    {
        var slug = title.ToLowerInvariant();
        slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
        slug = Regex.Replace(slug, @"\s+", "-");
        slug = Regex.Replace(slug, @"-+", "-");
        return slug.Trim('-');
    }
}
