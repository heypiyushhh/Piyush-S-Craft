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
            .FirstOrDefaultAsync(c => c.Slug == slug);

        return course == null ? null : MapToDto(course);
    }

    public async Task<CourseDto?> GetCourseByIdAsync(int id)
    {
        var course = await _unitOfWork.Courses.GetByIdAsync(id);
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
        CreatedAt = c.CreatedAt,
        EnrollmentCount = c.Enrollments?.Count ?? 0
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
