using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Application.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<ProjectDto>> GetAllProjectsAsync();
    Task<ProjectDto?> GetProjectByIdAsync(int id);
    Task CreateProjectAsync(ProjectDto projectDto);
    Task UpdateProjectAsync(ProjectDto projectDto);
    Task DeleteProjectAsync(int id);
}
