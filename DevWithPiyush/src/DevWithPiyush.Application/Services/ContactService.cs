using DevWithPiyush.Application.DTOs;
using DevWithPiyush.Application.Interfaces;
using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Application.Services;

public class ContactService : IContactService
{
    private readonly IUnitOfWork _unitOfWork;

    public ContactService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task SubmitQueryAsync(ContactQueryDto dto)
    {
        var query = new ContactQuery
        {
            Name = dto.Name,
            Email = dto.Email,
            Subject = dto.Subject,
            Message = dto.Message,
            IsRead = false,
            SubmittedAt = DateTime.UtcNow
        };

        await _unitOfWork.ContactQueries.AddAsync(query);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<ContactQueryDto>> GetAllQueriesAsync()
    {
        return await _unitOfWork.ContactQueries
            .Query()
            .OrderByDescending(q => q.SubmittedAt)
            .Select(q => new ContactQueryDto
            {
                Id = q.Id,
                Name = q.Name,
                Email = q.Email,
                Subject = q.Subject,
                Message = q.Message,
                IsRead = q.IsRead,
                SubmittedAt = q.SubmittedAt
            })
            .ToListAsync();
    }

    public async Task MarkAsReadAsync(int id)
    {
        var query = await _unitOfWork.ContactQueries.GetByIdAsync(id);
        if (query == null) return;

        query.IsRead = true;
        _unitOfWork.ContactQueries.Update(query);
        await _unitOfWork.SaveChangesAsync();
    }
}
