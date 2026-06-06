using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Interfaces;
using DevWithPiyush.Infrastructure.Data;

namespace DevWithPiyush.Infrastructure.Repositories;

/// <summary>
/// Unit of Work implementation. Manages repository lifetimes and
/// ensures all changes are committed in a single transaction.
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    private IRepository<Course>? _courses;
    private IRepository<Enrollment>? _enrollments;
    private IRepository<ContactQuery>? _contactQueries;
    private IRepository<Project>? _projects;
    private IRepository<Skill>? _skills;
    private IRepository<Certificate>? _certificates;
    private IRepository<CourseSection>? _courseSections;
    private IRepository<Lesson>? _lessons;
    private IRepository<LessonProgress>? _lessonProgresses;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IRepository<Course> Courses
        => _courses ??= new Repository<Course>(_context);

    public IRepository<Enrollment> Enrollments
        => _enrollments ??= new Repository<Enrollment>(_context);

    public IRepository<ContactQuery> ContactQueries
        => _contactQueries ??= new Repository<ContactQuery>(_context);

    public IRepository<Project> Projects
        => _projects ??= new Repository<Project>(_context);

    public IRepository<Skill> Skills
        => _skills ??= new Repository<Skill>(_context);

    public IRepository<Certificate> Certificates
        => _certificates ??= new Repository<Certificate>(_context);

    public IRepository<CourseSection> CourseSections
        => _courseSections ??= new Repository<CourseSection>(_context);

    public IRepository<Lesson> Lessons
        => _lessons ??= new Repository<Lesson>(_context);

    public IRepository<LessonProgress> LessonProgresses
        => _lessonProgresses ??= new Repository<LessonProgress>(_context);

    public async Task<int> SaveChangesAsync()
        => await _context.SaveChangesAsync();

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}
