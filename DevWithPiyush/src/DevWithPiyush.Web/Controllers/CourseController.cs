using System.Security.Claims;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevWithPiyush.Web.Controllers;

public class CourseController : Controller
{
    private readonly ICourseService _courseService;
    private readonly IEnrollmentService _enrollmentService;

    public CourseController(ICourseService courseService, IEnrollmentService enrollmentService)
    {
        _courseService = courseService;
        _enrollmentService = enrollmentService;
    }

    public async Task<IActionResult> Index(string? search, string? level)
    {
        var courses = await _courseService.GetPublishedCoursesAsync();

        if (!string.IsNullOrWhiteSpace(search))
            courses = courses.Where(c =>
                c.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                c.ShortDescription.Contains(search, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrWhiteSpace(level) && Enum.TryParse<DevWithPiyush.Domain.Enums.CourseLevel>(level, out var lvl))
            courses = courses.Where(c => c.Level == lvl);

        var model = new CourseListViewModel
        {
            Courses = courses,
            SearchTerm = search,
            LevelFilter = level
        };

        return View(model);
    }

    public async Task<IActionResult> Details(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
            return NotFound();

        var course = await _courseService.GetCourseBySlugAsync(slug);
        if (course == null)
            return NotFound();

        var isEnrolled = false;
        if (User.Identity?.IsAuthenticated == true)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            isEnrolled = await _enrollmentService.IsEnrolledAsync(userId, course.Id);
        }

        var model = new CourseDetailViewModel
        {
            Course = course,
            IsEnrolled = isEnrolled,
            IsAuthenticated = User.Identity?.IsAuthenticated == true
        };

        return View(model);
    }

    [HttpPost]
    [Authorize]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Enroll(int courseId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var (success, message) = await _enrollmentService.EnrollStudentAsync(userId, courseId);

        TempData[success ? "Success" : "Error"] = message;

        if (success)
            return RedirectToAction("Dashboard", "Student");

        return RedirectToAction("Index");
    }

    [Authorize]
    public async Task<IActionResult> Watch(string slug, int? lessonId)
    {
        if (string.IsNullOrWhiteSpace(slug))
            return NotFound();

        var course = await _courseService.GetCourseBySlugAsync(slug);
        if (course == null)
            return NotFound();

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var isEnrolled = await _enrollmentService.IsEnrolledAsync(userId, course.Id);

        if (!isEnrolled)
            return RedirectToAction("Details", new { slug });

        var completedLessonIds = await _enrollmentService.GetCompletedLessonIdsAsync(userId, course.Id);
        foreach (var section in course.Sections)
        {
            foreach (var lesson in section.Lessons)
            {
                lesson.IsCompleted = completedLessonIds.Contains(lesson.Id);
            }
        }

        var currentLesson = lessonId.HasValue
            ? course.Sections.SelectMany(s => s.Lessons).FirstOrDefault(l => l.Id == lessonId.Value)
            : course.Sections.OrderBy(s => s.Order).FirstOrDefault()?.Lessons.OrderBy(l => l.Order).FirstOrDefault();

        var model = new CoursePlayerViewModel
        {
            Course = course,
            CurrentLesson = currentLesson,
            IsEnrolled = isEnrolled
        };

        return View(model);
    }

    [HttpPost]
    [Authorize]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CompleteLesson(int lessonId, string slug)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        await _enrollmentService.TrackLessonProgressAsync(userId, lessonId);
        return RedirectToAction("Watch", new { slug, lessonId });
    }
}
