using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevWithPiyush.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIssuesCertificateToCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IssuesCertificate",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IssuesCertificate",
                table: "Courses");
        }
    }
}
