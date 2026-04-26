using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevWithPiyush.Web.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly IDashboardService _dashboardService;
    private readonly ICourseService _courseService;
    private readonly IContactService _contactService;
    private readonly IEnrollmentService _enrollmentService;

    public AdminController(
        IDashboardService dashboardService,
        ICourseService courseService,
        IContactService contactService,
        IEnrollmentService enrollmentService)
    {
        _dashboardService = dashboardService;
        _courseService = courseService;
        _contactService = contactService;
        _enrollmentService = enrollmentService;
    }

    // ── Dashboard ───────────────────────────────────────────────
    public async Task<IActionResult> Index()
    {
        var dashboard = await _dashboardService.GetAdminDashboardAsync();
        return View(dashboard);
    }

    // ── Courses ─────────────────────────────────────────────────
    public async Task<IActionResult> Courses()
    {
        var courses = await _courseService.GetAllCoursesAsync();
        return View(courses);
    }

    [HttpGet]
    public IActionResult CreateCourse()
    {
        return View("CourseForm", new CourseDto());
    }

    [HttpGet]
    public async Task<IActionResult> EditCourse(int id)
    {
        var course = await _courseService.GetCourseByIdAsync(id);
        if (course == null) return NotFound();
        return View("CourseForm", course);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SaveCourse(CourseDto model)
    {
        if (!ModelState.IsValid)
            return View("CourseForm", model);

        if (model.Id == 0)
            await _courseService.CreateCourseAsync(model);
        else
            await _courseService.UpdateCourseAsync(model);

        TempData["Success"] = model.Id == 0 ? "Course created successfully!" : "Course updated successfully!";
        return RedirectToAction(nameof(Courses));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        await _courseService.DeleteCourseAsync(id);
        TempData["Success"] = "Course deleted successfully!";
        return RedirectToAction(nameof(Courses));
    }

    // ── Students ────────────────────────────────────────────────
    public async Task<IActionResult> Students()
    {
        var students = await _dashboardService.GetAllStudentsAsync();
        return View(students);
    }

    // ── Enrollments ─────────────────────────────────────────────
    public async Task<IActionResult> Enrollments()
    {
        var enrollments = await _enrollmentService.GetAllEnrollmentsAsync();
        return View(enrollments);
    }

    // ── Contact Queries ─────────────────────────────────────────
    public async Task<IActionResult> Queries()
    {
        var queries = await _contactService.GetAllQueriesAsync();
        return View(queries);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> MarkQueryRead(int id)
    {
        await _contactService.MarkAsReadAsync(id);
        return RedirectToAction(nameof(Queries));
    }
}
