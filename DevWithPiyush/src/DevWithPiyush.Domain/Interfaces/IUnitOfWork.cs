using DevWithPiyush.Domain.Entities;

namespace DevWithPiyush.Domain.Interfaces;

/// <summary>
/// Unit of Work wraps SaveChanges and exposes typed repositories.
/// Ensures all changes within a business operation are committed atomically.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    IRepository<Course> Courses { get; }
    IRepository<Enrollment> Enrollments { get; }
    IRepository<ContactQuery> ContactQueries { get; }
    IRepository<Project> Projects { get; }
    IRepository<Skill> Skills { get; }
    Task<int> SaveChangesAsync();
}
