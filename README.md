# DevWithPiyush — ASP.NET Core MVC Platform

[![Production CI Pipeline](https://github.com/heypiyushhh/Piyush-S-Craft/actions/workflows/ci.yml/badge.svg)](https://github.com/heypiyushhh/Piyush-S-Craft/actions/workflows/ci.yml)

A production-ready ASP.NET Core MVC (.NET 8) platform using PostgreSQL database and configured for seamless deployment on Render.

---

## Technical Stack
- **Framework:** ASP.NET Core MVC (.NET 8)
- **Database:** PostgreSQL (with Neon DB in production)
- **ORM:** Entity Framework Core (using `Npgsql.EntityFrameworkCore.PostgreSQL`)
- **Containerization:** Docker (multi-stage production builds)
- **Hosting:** Render (Cloud Application Hosting)

---

## Local Development Setup

### 1. Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL](https://www.postgresql.org/download/) (running locally, or use a Docker container)
- EF Core CLI Tools:
  ```bash
  dotnet tool install --global dotnet-ef
  ```

### 2. Configure Connection String
Update your local connection string in `DevWithPiyush/src/DevWithPiyush.Web/appsettings.Development.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=DevWithPiyush;Username=postgres;Password=yourpassword;Include Error Detail=true"
}
```

### 3. Build & Migrate Database
Restore NuGet packages, compile the application, and apply database migrations:
```bash
# Navigate to the solution folder
cd DevWithPiyush

# Restore and Build
dotnet restore
dotnet build

# Generate migrations (if not already done)
dotnet ef migrations add InitialPostgres -p src/DevWithPiyush.Infrastructure -s src/DevWithPiyush.Web

# Apply migrations to database
dotnet ef database update -p src/DevWithPiyush.Infrastructure -s src/DevWithPiyush.Web

# Run the app locally
dotnet run --project src/DevWithPiyush.Web
```

---

## Production Deployment on Render

This project is configured with Infrastructure-as-Code (`render.yaml`) and Docker settings.

### 1. Build and Run via Docker
To test the production Docker build locally:
```bash
# Build Docker image from workspace root
docker build -t dev-with-piyush .

# Run Docker container
docker run -e DATABASE_CONNECTION_STRING="your_postgres_connection_string" -e PORT=8080 -p 8080:8080 dev-with-piyush
```

### 2. Direct Render Deployment
1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository containing this codebase.
4. Render will parse the `render.yaml` file automatically.
5. In the blueprint setup page, supply your PostgreSQL connection string for the `DATABASE_CONNECTION_STRING` variable (e.g. your Neon DB connection string: `postgresql://neondb_owner:npg_ueOtGcF1ki7E@ep-small-queen-atnmm4i6.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require`).
6. Click **Apply**. Render will build the Docker container and deploy the app.
