using DevWithPiyush.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DevWithPiyush.Infrastructure.Data;

/// <summary>
/// Central EF Core DbContext. Inherits IdentityDbContext for ASP.NET Identity tables.
/// Configures entity relationships and constraints via Fluent API.
/// </summary>
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();
    public DbSet<ContactQuery> ContactQueries => Set<ContactQuery>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Skill> Skills => Set<Skill>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ── Course ──────────────────────────────────────────────
        builder.Entity<Course>(e =>
        {
            e.HasIndex(c => c.Slug).IsUnique();
            e.Property(c => c.Price).HasPrecision(18, 2);
            e.Property(c => c.Level).HasConversion<string>();
        });

        // ── Enrollment ──────────────────────────────────────────
        builder.Entity<Enrollment>(e =>
        {
            // Prevent duplicate enrollments
            e.HasIndex(en => new { en.UserId, en.CourseId }).IsUnique();

            e.Property(en => en.Status).HasConversion<string>();

            e.HasOne(en => en.User)
             .WithMany(u => u.Enrollments)
             .HasForeignKey(en => en.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(en => en.Course)
             .WithMany(c => c.Enrollments)
             .HasForeignKey(en => en.CourseId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── ContactQuery ────────────────────────────────────────
        builder.Entity<ContactQuery>(e =>
        {
            e.HasIndex(q => q.SubmittedAt);
        });

        // ── Project ─────────────────────────────────────────────
        builder.Entity<Project>(e =>
        {
            e.HasIndex(p => p.DisplayOrder);
        });

        // ── Skill ───────────────────────────────────────────────
        builder.Entity<Skill>(e =>
        {
            e.HasIndex(s => s.DisplayOrder);
        });
    }
}
