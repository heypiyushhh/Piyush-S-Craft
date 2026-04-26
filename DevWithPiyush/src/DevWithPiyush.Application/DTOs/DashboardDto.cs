namespace DevWithPiyush.Application.DTOs;

public class AdminDashboardDto
{
    public int TotalCourses { get; set; }
    public int TotalStudents { get; set; }
    public int TotalEnrollments { get; set; }
    public int UnreadQueries { get; set; }
    public List<EnrollmentDto> RecentEnrollments { get; set; } = new();
}

public class StudentDashboardDto
{
    public string StudentName { get; set; } = string.Empty;
    public int TotalEnrolled { get; set; }
    public int InProgress { get; set; }
    public int Completed { get; set; }
    public List<EnrollmentDto> Enrollments { get; set; } = new();
}

public class StudentDto
{
    public string Id { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public int EnrolledCourses { get; set; }
}
