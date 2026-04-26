using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Interfaces;
using DevWithPiyush.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Web.Controllers;

public class HomeController : Controller
{
    private readonly ICourseService _courseService;
    private readonly IContactService _contactService;
    private readonly IUnitOfWork _unitOfWork;

    public HomeController(
        ICourseService courseService,
        IContactService contactService,
        IUnitOfWork unitOfWork)
    {
        _courseService = courseService;
        _contactService = contactService;
        _unitOfWork = unitOfWork;
    }

    public async Task<IActionResult> Index()
    {
        var skills = await _unitOfWork.Skills.Query()
            .OrderBy(s => s.DisplayOrder)
            .ToListAsync();

        var projects = await _unitOfWork.Projects.Query()
            .Where(p => p.IsVisible)
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();

        var courses = await _courseService.GetPublishedCoursesAsync();

        var model = new HomeViewModel
        {
            Skills = skills,
            Projects = projects,
            FeaturedCourses = courses.Take(3)
        };

        return View(model);
    }

    [HttpGet]
    public IActionResult Contact()
    {
        return View(new ContactQueryDto());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Contact(ContactQueryDto model)
    {
        if (!ModelState.IsValid)
            return View(model);

        await _contactService.SubmitQueryAsync(model);
        TempData["Success"] = "Your message has been sent successfully! We'll get back to you soon.";
        return RedirectToAction(nameof(Contact));
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View();
    }
}
