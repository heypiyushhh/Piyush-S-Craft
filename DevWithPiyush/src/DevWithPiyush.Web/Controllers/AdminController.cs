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
    private readonly IProjectService _projectService;
    private readonly ISkillService _skillService;

    public AdminController(
        IDashboardService dashboardService,
        ICourseService courseService,
        IContactService contactService,
        IEnrollmentService enrollmentService,
        IProjectService projectService,
        ISkillService skillService)
    {
        _dashboardService = dashboardService;
        _courseService = courseService;
        _contactService = contactService;
        _enrollmentService = enrollmentService;
        _projectService = projectService;
        _skillService = skillService;
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

    // ── Curriculum Management ───────────────────────────────────

    public async Task<IActionResult> Curriculum(int id)
    {
        var course = await _courseService.GetCourseByIdAsync(id);
        if (course == null) return NotFound();
        return View(course);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddSection(int courseId, string title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            TempData["Error"] = "Section title is required.";
            return RedirectToAction(nameof(Curriculum), new { id = courseId });
        }
        await _courseService.AddSectionAsync(courseId, title);
        TempData["Success"] = "Section added.";
        return RedirectToAction(nameof(Curriculum), new { id = courseId });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddLesson(int sectionId, int courseId, string title, string? youtubeVideoId)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            TempData["Error"] = "Lesson title is required.";
            return RedirectToAction(nameof(Curriculum), new { id = courseId });
        }
        await _courseService.AddLessonAsync(sectionId, title, youtubeVideoId);
        TempData["Success"] = "Lesson added.";
        return RedirectToAction(nameof(Curriculum), new { id = courseId });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteSection(int sectionId, int courseId)
    {
        await _courseService.DeleteSectionAsync(sectionId);
        TempData["Success"] = "Section deleted.";
        return RedirectToAction(nameof(Curriculum), new { id = courseId });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteLesson(int lessonId, int courseId)
    {
        await _courseService.DeleteLessonAsync(lessonId);
        TempData["Success"] = "Lesson deleted.";
        return RedirectToAction(nameof(Curriculum), new { id = courseId });
    }

    // ── Projects ────────────────────────────────────────────────
    public async Task<IActionResult> Projects()
    {
        var projects = await _projectService.GetAllProjectsAsync();
        return View(projects);
    }

    [HttpGet]
    public IActionResult CreateProject()
    {
        return View("ProjectForm", new ProjectDto());
    }

    [HttpGet]
    public async Task<IActionResult> EditProject(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null) return NotFound();
        return View("ProjectForm", project);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SaveProject(ProjectDto model)
    {
        if (!ModelState.IsValid)
            return View("ProjectForm", model);

        if (model.Id == 0)
            await _projectService.CreateProjectAsync(model);
        else
            await _projectService.UpdateProjectAsync(model);

        TempData["Success"] = model.Id == 0 ? "Project created successfully!" : "Project updated successfully!";
        return RedirectToAction(nameof(Projects));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteProject(int id)
    {
        await _projectService.DeleteProjectAsync(id);
        TempData["Success"] = "Project deleted successfully!";
        return RedirectToAction(nameof(Projects));
    }

    // ── Skills ──────────────────────────────────────────────────
    public async Task<IActionResult> Skills()
    {
        var skills = await _skillService.GetAllSkillsAsync();
        return View(skills);
    }

    [HttpGet]
    public IActionResult CreateSkill()
    {
        return View("SkillForm", new SkillDto());
    }

    [HttpGet]
    public async Task<IActionResult> EditSkill(int id)
    {
        var skill = await _skillService.GetSkillByIdAsync(id);
        if (skill == null) return NotFound();
        return View("SkillForm", skill);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SaveSkill(SkillDto model)
    {
        if (!ModelState.IsValid)
            return View("SkillForm", model);

        if (model.Id == 0)
            await _skillService.CreateSkillAsync(model);
        else
            await _skillService.UpdateSkillAsync(model);

        TempData["Success"] = model.Id == 0 ? "Skill created successfully!" : "Skill updated successfully!";
        return RedirectToAction(nameof(Skills));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteSkill(int id)
    {
        await _skillService.DeleteSkillAsync(id);
        TempData["Success"] = "Skill deleted successfully!";
        return RedirectToAction(nameof(Skills));
    }
}
