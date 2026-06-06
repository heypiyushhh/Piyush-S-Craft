# ==========================================
# Stage 1: Base Runtime Environment
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# QuestPDF's Skia engine requires fontconfig and basic fonts to render text on Linux.
# Installing these libraries prevents runtime crashes during PDF operations.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libfontconfig1 \
    fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

# Run the application under the built-in non-root 'app' user for security hardening
USER app

# ==========================================
# Stage 2: SDK Build Environment
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy all project files individually to cache package restore layer
COPY ["DevWithPiyush/src/DevWithPiyush.Web/DevWithPiyush.Web.csproj", "DevWithPiyush/src/DevWithPiyush.Web/"]
COPY ["DevWithPiyush/src/DevWithPiyush.Application/DevWithPiyush.Application.csproj", "DevWithPiyush/src/DevWithPiyush.Application/"]
COPY ["DevWithPiyush/src/DevWithPiyush.Infrastructure/DevWithPiyush.Infrastructure.csproj", "DevWithPiyush/src/DevWithPiyush.Infrastructure/"]
COPY ["DevWithPiyush/src/DevWithPiyush.Domain/DevWithPiyush.Domain.csproj", "DevWithPiyush/src/DevWithPiyush.Domain/"]

# Restore NuGet packages
RUN dotnet restore "DevWithPiyush/src/DevWithPiyush.Web/DevWithPiyush.Web.csproj"

# Copy all remaining source files
COPY . .

# Build the Web startup project
WORKDIR "/src/DevWithPiyush/src/DevWithPiyush.Web"
RUN dotnet build "DevWithPiyush.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

# ==========================================
# Stage 3: Publish Build Artifacts
# ==========================================
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "DevWithPiyush.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# ==========================================
# Stage 4: Production Image
# ==========================================
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Environment Defaults
ENV ASPNETCORE_ENVIRONMENT=Production

# Bind to the Render-provided PORT environment variable dynamically at runtime.
# Evaluates $PORT (injected by Render) and falls back to 8080 if not set.
ENTRYPOINT ["sh", "-c", "dotnet DevWithPiyush.Web.dll --urls http://+:${PORT:-8080}"]
