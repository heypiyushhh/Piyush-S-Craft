using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Application.Services;

public class ProjectService : IProjectService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProjectService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
    {
        return await _unitOfWork.Projects
            .Query()
            .OrderBy(p => p.DisplayOrder)
            .Select(p => MapToDto(p))
            .ToListAsync();
    }

    public async Task<ProjectDto?> GetProjectByIdAsync(int id)
    {
        var project = await _unitOfWork.Projects.GetByIdAsync(id);
        return project == null ? null : MapToDto(project);
    }

    public async Task CreateProjectAsync(ProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            LiveUrl = dto.LiveUrl,
            GitHubUrl = dto.GitHubUrl,
            Technologies = dto.Technologies,
            DisplayOrder = dto.DisplayOrder,
            IsVisible = dto.IsVisible
        };

        await _unitOfWork.Projects.AddAsync(project);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateProjectAsync(ProjectDto dto)
    {
        var project = await _unitOfWork.Projects.GetByIdAsync(dto.Id);
        if (project == null) throw new InvalidOperationException("Project not found.");

        project.Title = dto.Title;
        project.Description = dto.Description;
        project.ImageUrl = dto.ImageUrl;
        project.LiveUrl = dto.LiveUrl;
        project.GitHubUrl = dto.GitHubUrl;
        project.Technologies = dto.Technologies;
        project.DisplayOrder = dto.DisplayOrder;
        project.IsVisible = dto.IsVisible;

        _unitOfWork.Projects.Update(project);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteProjectAsync(int id)
    {
        var project = await _unitOfWork.Projects.GetByIdAsync(id);
        if (project != null)
        {
            _unitOfWork.Projects.Delete(project);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    private static ProjectDto MapToDto(Project p) => new()
    {
        Id = p.Id,
        Title = p.Title,
        Description = p.Description,
        ImageUrl = p.ImageUrl,
        LiveUrl = p.LiveUrl,
        GitHubUrl = p.GitHubUrl,
        Technologies = p.Technologies,
        DisplayOrder = p.DisplayOrder,
        IsVisible = p.IsVisible
    };
}
