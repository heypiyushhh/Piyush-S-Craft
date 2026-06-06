using System.Security.Claims;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Interfaces;
using DevWithPiyush.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Web.Controllers;

public class CertificateController : Controller
{
    private readonly IEnrollmentService _enrollmentService;

    public CertificateController(IEnrollmentService enrollmentService)
    {
        _enrollmentService = enrollmentService;
    }

    /// <summary>
    /// Student dashboard endpoint to view/generate certificate.
    /// </summary>
    [Authorize]
    public async Task<IActionResult> View(int enrollmentId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var certificate = await _enrollmentService.GetOrCreateCertificateAsync(enrollmentId, userId);

        if (certificate == null)
        {
            TempData["Error"] = "Certificate is only available for completed courses.";
            return RedirectToAction("Dashboard", "Student");
        }

        return RedirectToAction(nameof(Verify), new { id = certificate.CertificateUniqueId });
    }

    /// <summary>
    /// Public verification URL that renders the certificate.
    /// </summary>
    [HttpGet("Certificate/Verify/{id}")]
    public async Task<IActionResult> Verify(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            return NotFound("Certificate ID is required.");
        }

        var certificate = await _enrollmentService.GetCertificateByUniqueIdAsync(id);
        if (certificate == null || certificate.Enrollment?.Course?.IssuesCertificate == false)
        {
            ViewData["ErrorMessage"] = $"Certificate with ID '{id}' is no longer active or the course does not issue certificates.";
            return View("NotFound");
        }

        var verificationUrl = Url.Action(nameof(Verify), "Certificate", new { id = certificate.CertificateUniqueId }, Request.Scheme);

        var issueDateStr = FormatDateWithOrdinal(certificate.CompletionDate);
        var startDateStr = certificate.Enrollment != null
            ? FormatDateWithOrdinal(certificate.Enrollment.EnrolledAt)
            : FormatDateWithOrdinal(certificate.CompletionDate.AddMonths(-2)); // Default fallback if enrollment details missing

        var viewModel = new CertificateViewModel
        {
            StudentName = certificate.StudentName,
            CourseName = certificate.ProgramName,
            CertificateId = certificate.CertificateUniqueId,
            Date = issueDateStr,
            ProgramDates = $"{startDateStr} to {issueDateStr}",
            VerificationUrl = verificationUrl ?? string.Empty
        };

        return View(viewModel);
    }

    private static string FormatDateWithOrdinal(DateTime date)
    {
        int day = date.Day;
        string suffix = "th";
        if (day is not (11 or 12 or 13))
        {
            suffix = (day % 10) switch
            {
                1 => "st",
                2 => "nd",
                3 => "rd",
                _ => "th"
            };
        }
        return $"{day}{suffix} {date:MMMM yyyy}";
    }
}
