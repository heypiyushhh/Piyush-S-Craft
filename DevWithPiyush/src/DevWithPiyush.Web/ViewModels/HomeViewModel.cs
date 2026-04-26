using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Domain.Entities;

namespace DevWithPiyush.Web.ViewModels;

public class HomeViewModel
{
    public IEnumerable<Skill> Skills { get; set; } = [];
    public IEnumerable<Project> Projects { get; set; } = [];
    public IEnumerable<CourseDto> FeaturedCourses { get; set; } = [];
}
