using DevWithPiyush.Domain.Entities;
using DevWithPiyush.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DevWithPiyush.Infrastructure.Data;

/// <summary>
/// Seeds initial roles, admin user, courses, projects, and skills.
/// Called once at application startup. Idempotent — safe to run multiple times.
/// </summary>
public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        // Ensure DB is created and migrated
        await context.Database.MigrateAsync();

        // ── Roles ───────────────────────────────────────────────
        string[] roles = ["Admin", "Student"];
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // ── Admin User ──────────────────────────────────────────
        const string adminEmail = "admin@devwithpiyush.com";
        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "Piyush (Admin)",
                EmailConfirmed = true,
                CreatedAt = DateTime.UtcNow
            };
            var result = await userManager.CreateAsync(admin, "Admin@123456");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(admin, "Admin");
        }

        // ── Sample Student ──────────────────────────────────────
        const string studentEmail = "student@devwithpiyush.com";
        if (await userManager.FindByEmailAsync(studentEmail) == null)
        {
            var student = new ApplicationUser
            {
                UserName = studentEmail,
                Email = studentEmail,
                FullName = "Demo Student",
                EmailConfirmed = true,
                CreatedAt = DateTime.UtcNow
            };
            var result = await userManager.CreateAsync(student, "Student@123456");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(student, "Student");
        }

        // ── Courses ─────────────────────────────────────────────
        if (!await context.Courses.AnyAsync())
        {
            var courses = new List<Course>
            {
                new()
                {
                    Title = "C# Fundamentals",
                    Slug = "csharp-fundamentals",
                    ShortDescription = "Master the C# programming language from basics to advanced concepts.",
                    Description = "This comprehensive course covers C# from the ground up. You'll learn variables, data types, control flow, OOP principles, LINQ, async/await, and modern C# features. Perfect for beginners and those transitioning from other languages.",
                    Level = CourseLevel.Beginner,
                    DurationHours = 40,
                    Price = 0,
                    IsPublished = true,
                    ImageUrl = "/images/courses/csharp.svg"
                },
                new()
                {
                    Title = "ASP.NET Core MVC Masterclass",
                    Slug = "aspnet-core-mvc-masterclass",
                    ShortDescription = "Build production-ready web applications with ASP.NET Core MVC.",
                    Description = "Deep dive into ASP.NET Core MVC architecture. Learn routing, controllers, views, model binding, authentication, authorization, Entity Framework Core, and deployment. Build real-world projects throughout the course.",
                    Level = CourseLevel.Intermediate,
                    DurationHours = 60,
                    Price = 999,
                    IsPublished = true,
                    ImageUrl = "/images/courses/aspnet.svg"
                },
                new()
                {
                    Title = "React for .NET Developers",
                    Slug = "react-for-dotnet-developers",
                    ShortDescription = "Learn React.js with a backend-first approach for .NET developers.",
                    Description = "Bridge the gap between backend and frontend. Learn React fundamentals, hooks, state management, API integration with ASP.NET Core, and modern frontend tooling. Build a full-stack application by the end.",
                    Level = CourseLevel.Intermediate,
                    DurationHours = 35,
                    Price = 799,
                    IsPublished = true,
                    ImageUrl = "/images/courses/react.svg"
                },
                new()
                {
                    Title = "SQL Server & Database Design",
                    Slug = "sql-server-database-design",
                    ShortDescription = "Master SQL Server from queries to performance optimization.",
                    Description = "Learn database design principles, T-SQL, stored procedures, indexing strategies, query optimization, and database administration. Includes real-world scenarios and performance tuning exercises.",
                    Level = CourseLevel.Beginner,
                    DurationHours = 30,
                    Price = 0,
                    IsPublished = true,
                    ImageUrl = "/images/courses/sql.svg"
                },
                new()
                {
                    Title = "Azure Cloud for Developers",
                    Slug = "azure-cloud-for-developers",
                    ShortDescription = "Deploy and scale .NET applications on Microsoft Azure.",
                    Description = "Hands-on guide to Azure services for developers. Cover App Service, Azure SQL, Blob Storage, Azure Functions, CI/CD pipelines, and monitoring. Deploy a complete application to the cloud.",
                    Level = CourseLevel.Advanced,
                    DurationHours = 45,
                    Price = 1499,
                    IsPublished = true,
                    ImageUrl = "/images/courses/azure.svg"
                },
                new()
                {
                    Title = "Docker & Containerization",
                    Slug = "docker-containerization",
                    ShortDescription = "Containerize .NET applications with Docker and orchestrate with Kubernetes.",
                    Description = "Learn containerization from scratch. Build Docker images, compose multi-container applications, implement CI/CD with containers, and get an introduction to Kubernetes orchestration. Includes .NET-specific best practices.",
                    Level = CourseLevel.Advanced,
                    DurationHours = 25,
                    Price = 1299,
                    IsPublished = true,
                    ImageUrl = "/images/courses/docker.svg"
                }
            };
            await context.Courses.AddRangeAsync(courses);
        }

        // ── Portfolio Projects ──────────────────────────────────
        if (!await context.Projects.AnyAsync())
        {
            var projects = new List<Project>
            {
                new()
                {
                    Title = "E-Commerce Platform",
                    Description = "A full-featured e-commerce solution with payment integration, inventory management, and real-time order tracking.",
                    Technologies = "ASP.NET Core, React, SQL Server, Redis, Stripe",
                    LiveUrl = "https://example.com",
                    GitHubUrl = "https://github.com/devwithpiyush/ecommerce",
                    DisplayOrder = 1,
                    IsVisible = true
                },
                new()
                {
                    Title = "Learning Management System",
                    Description = "Comprehensive LMS with course creation, student tracking, quizzes, and certificate generation.",
                    Technologies = "ASP.NET Core MVC, Entity Framework, SQL Server, SignalR",
                    LiveUrl = "https://example.com",
                    GitHubUrl = "https://github.com/devwithpiyush/lms",
                    DisplayOrder = 2,
                    IsVisible = true
                },
                new()
                {
                    Title = "Real-Time Chat Application",
                    Description = "Scalable real-time messaging platform supporting group chats, file sharing, and message encryption.",
                    Technologies = "ASP.NET Core, SignalR, Angular, MongoDB",
                    LiveUrl = "https://example.com",
                    GitHubUrl = "https://github.com/devwithpiyush/chatapp",
                    DisplayOrder = 3,
                    IsVisible = true
                },
                new()
                {
                    Title = "Task Management Dashboard",
                    Description = "Kanban-style project management tool with drag-and-drop, team collaboration, and analytics.",
                    Technologies = "Blazor, ASP.NET Core API, PostgreSQL, Docker",
                    LiveUrl = "https://example.com",
                    GitHubUrl = "https://github.com/devwithpiyush/taskboard",
                    DisplayOrder = 4,
                    IsVisible = true
                },
                new()
                {
                    Title = "API Gateway & Microservices",
                    Description = "Microservices architecture with API gateway, service discovery, and distributed tracing.",
                    Technologies = "ASP.NET Core, Ocelot, RabbitMQ, Docker, Kubernetes",
                    LiveUrl = "https://example.com",
                    GitHubUrl = "https://github.com/devwithpiyush/microservices",
                    DisplayOrder = 5,
                    IsVisible = true
                }
            };
            await context.Projects.AddRangeAsync(projects);
        }

        // ── Skills ──────────────────────────────────────────────
        if (!await context.Skills.AnyAsync())
        {
            var skills = new List<Skill>
            {
                new() { Name = "C# / .NET", Category = "Backend", Proficiency = 95, DisplayOrder = 1 },
                new() { Name = "ASP.NET Core", Category = "Backend", Proficiency = 92, DisplayOrder = 2 },
                new() { Name = "SQL Server", Category = "Database", Proficiency = 90, DisplayOrder = 3 },
                new() { Name = "Entity Framework Core", Category = "ORM", Proficiency = 88, DisplayOrder = 4 },
                new() { Name = "JavaScript / TypeScript", Category = "Frontend", Proficiency = 82, DisplayOrder = 5 },
                new() { Name = "React", Category = "Frontend", Proficiency = 78, DisplayOrder = 6 },
                new() { Name = "Azure Cloud", Category = "DevOps", Proficiency = 75, DisplayOrder = 7 },
                new() { Name = "Docker & Kubernetes", Category = "DevOps", Proficiency = 70, DisplayOrder = 8 }
            };
            await context.Skills.AddRangeAsync(skills);
        }

        await context.SaveChangesAsync();
    }
}
