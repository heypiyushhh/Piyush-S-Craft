using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Application.Services;

public class SkillService : ISkillService
{
    private readonly IUnitOfWork _unitOfWork;

    public SkillService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<SkillDto>> GetAllSkillsAsync()
    {
        return await _unitOfWork.Skills
            .Query()
            .OrderBy(s => s.DisplayOrder)
            .Select(s => MapToDto(s))
            .ToListAsync();
    }

    public async Task<SkillDto?> GetSkillByIdAsync(int id)
    {
        var skill = await _unitOfWork.Skills.GetByIdAsync(id);
        return skill == null ? null : MapToDto(skill);
    }

    public async Task CreateSkillAsync(SkillDto dto)
    {
        var skill = new Skill
        {
            Name = dto.Name,
            Category = dto.Category,
            Proficiency = dto.Proficiency,
            DisplayOrder = dto.DisplayOrder
        };

        await _unitOfWork.Skills.AddAsync(skill);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateSkillAsync(SkillDto dto)
    {
        var skill = await _unitOfWork.Skills.GetByIdAsync(dto.Id);
        if (skill == null) throw new InvalidOperationException("Skill not found.");

        skill.Name = dto.Name;
        skill.Category = dto.Category;
        skill.Proficiency = dto.Proficiency;
        skill.DisplayOrder = dto.DisplayOrder;

        _unitOfWork.Skills.Update(skill);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteSkillAsync(int id)
    {
        var skill = await _unitOfWork.Skills.GetByIdAsync(id);
        if (skill != null)
        {
            _unitOfWork.Skills.Delete(skill);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    private static SkillDto MapToDto(Skill s) => new()
    {
        Id = s.Id,
        Name = s.Name,
        Category = s.Category,
        Proficiency = s.Proficiency,
        DisplayOrder = s.DisplayOrder
    };
}
