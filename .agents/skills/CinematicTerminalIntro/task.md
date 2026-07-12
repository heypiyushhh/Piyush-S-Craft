# Tasks: Cinematic Terminal Boot Sequence & Premium Course Showcase

## 1. Cinematic Terminal Intro
- [x] Initialize and configure the React + TS project in `intro-app`
- [x] Implement Tailwind CSS configurations and styles in `intro-app`
- [x] Create the terminal animation component (`App.tsx`) with natural typing, glassmorphism UI, scenes 1-9, skip/localStorage logic, and smooth transition animations
- [x] Build and bundle the React project to `wwwroot` in `DevWithPiyush.Web`
- [x] Add pre-load checking script to `_Layout.cshtml` to prevent layout flashes
- [x] Insert mount container and bundle references in `Index.cshtml`
- [x] Add transition classes and styles to `site.css`
- [x] Add the "Replay Intro" button to the footer

## 2. Premium Interactive Course Showcase
- [x] Add `DemoVideoUrl` field to `Course` database entity and `CourseDto` DTO
- [x] Map `DemoVideoUrl` in `CourseService.cs` mapping routines
- [x] Perform EF Core Migration and database update
- [x] Update database seed data with high-quality Unsplash images and YouTube video URLs
- [x] Add a video URL input form field in the admin `CourseForm.cshtml` view
- [x] Build React `CoursesShowcase.tsx` featuring lazy-loaded YouTube videos, desktop hover-zoom effects, Netflix-style badges, and mobile tap overrides
- [x] Replace Razor course loop with JSON serialization and mount point in `Index.cshtml` (Homepage)
- [x] Replace Razor course loop with JSON serialization and mount point in `Course/Index.cshtml` (Courses List Catalog Page)
- [x] Restore original card styles and markup (`course-card`, `course-image`, `course-body` etc.) to match original design
- [x] Enable video audio playback (`mute=0`) inside YouTube previews
- [x] Recompile Vite React production bundle and verify Dotnet build
