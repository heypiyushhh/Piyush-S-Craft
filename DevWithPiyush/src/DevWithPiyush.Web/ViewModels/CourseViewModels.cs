using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Web.ViewModels;

public class CourseListViewModel
{
    public IEnumerable<CourseDto> Courses { get; set; } = [];
    public string? SearchTerm { get; set; }
    public string? LevelFilter { get; set; }
}

public class CourseDetailViewModel
{
    public CourseDto Course { get; set; } = new();
    public bool IsEnrolled { get; set; }
    public bool IsAuthenticated { get; set; }
}
