using DevWithPiyush.Application.DTOs;

namespace DevWithPiyush.Application.Interfaces;

public interface IContactService
{
    Task SubmitQueryAsync(ContactQueryDto dto);
    Task<IEnumerable<ContactQueryDto>> GetAllQueriesAsync();
    Task MarkAsReadAsync(int id);
}
