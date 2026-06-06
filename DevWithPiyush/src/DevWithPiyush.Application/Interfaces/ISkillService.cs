using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Application.Interfaces;

public interface ISkillService
{
    Task<IEnumerable<SkillDto>> GetAllSkillsAsync();
    Task<SkillDto?> GetSkillByIdAsync(int id);
    Task CreateSkillAsync(SkillDto skillDto);
    Task UpdateSkillAsync(SkillDto skillDto);
    Task DeleteSkillAsync(int id);
}
