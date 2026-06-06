using System.Security.Claims;
using DevWithPiyush.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevWithPiyush.Web.Controllers;

[Authorize(Roles = "Student")]
public class StudentController : Controller
{
    private readonly IDashboardService _dashboardService;
    private readonly IEnrollmentService _enrollmentService;

    public StudentController(IDashboardService dashboardService, IEnrollmentService enrollmentService)
    {
        _dashboardService = dashboardService;
        _enrollmentService = enrollmentService;
    }

    public async Task<IActionResult> Dashboard()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var dashboard = await _dashboardService.GetStudentDashboardAsync(userId);
        return View(dashboard);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateProgress(int enrollmentId, int progress)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var success = await _enrollmentService.UpdateProgressAsync(enrollmentId, userId, progress);

        if (!success)
            TempData["Error"] = "Failed to update progress.";
        else
            TempData["Success"] = "Progress updated successfully!";

        return RedirectToAction(nameof(Dashboard));
    }

    public IActionResult DownloadCertificate(int enrollmentId)
    {
        return RedirectToAction("View", "Certificate", new { enrollmentId });
    }
}
