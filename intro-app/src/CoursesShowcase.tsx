import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

interface Course {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl?: string | null;
  demoVideoUrl?: string | null;
  level: number; // 0 = Beginner, 1 = Intermediate, 2 = Advanced
  durationHours: number;
  price: number;
  enrollmentCount: number;
}

declare global {
  interface Window {
    portfolioCourses?: Course[];
  }
}

// Helper to extract 11-character YouTube video ID
const getYouTubeId = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  if (url.trim().length === 11) {
    return url.trim();
  }
  
  return null;
};

export default function CoursesShowcase() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeMobileCardId, setActiveMobileCardId] = useState<number | null>(null);

  useEffect(() => {
    if (window.portfolioCourses && Array.isArray(window.portfolioCourses)) {
      setCourses(window.portfolioCourses);
    }
  }, []);

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 font-mono text-sm">No featured courses available.</p>
      </div>
    );
  }

  // Reuse the exact same Bootstrap 5 row container
  return (
    <div className="row g-4">
      {courses.map((course, idx) => (
        <div className="col-lg-4 col-md-6" key={course.id}>
          <CourseCard
            course={course}
            index={idx}
            activeMobileCardId={activeMobileCardId}
            setActiveMobileCardId={setActiveMobileCardId}
          />
        </div>
      ))}
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  index: number;
  activeMobileCardId: number | null;
  setActiveMobileCardId: (id: number | null) => void;
}

function CourseCard({ course, activeMobileCardId, setActiveMobileCardId }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);
  const playTimeoutRef = useRef<number | null>(null);

  const isMobileActive = activeMobileCardId === course.id;
  const showVideo = isHovered || isMobileActive;
  const ytId = getYouTubeId(course.demoVideoUrl);

  // Manage video loading delay for smooth fade
  useEffect(() => {
    if (showVideo && ytId) {
      // Fade out cover image after 600ms to allow the iframe to load and buffer
      playTimeoutRef.current = window.setTimeout(() => {
        setIsVideoPlaying(true);
      }, 600);
    } else {
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
      setIsVideoPlaying(false);
    }
  }, [showVideo, ytId]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    // 150ms debounce to prevent loading when just sweeping mouse across grid
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  const handleMobileTap = (e: React.MouseEvent) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    if (isMobileActive) {
      window.location.href = `/Course/Details?slug=${course.slug}`;
    } else {
      e.preventDefault();
      e.stopPropagation();
      setActiveMobileCardId(course.id);
    }
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 0: return 'Beginner';
      case 1: return 'Intermediate';
      case 2: return 'Advanced';
      default: return 'All Levels';
    }
  };

  const placeholderImage = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'600' height%3D'340' viewBox%3D'0 0 600 340'%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'%23111827'%2F%3E%3Cpath d%3D'M300 130 C270 130 250 150 250 180 C250 210 270 230 300 230 C330 230 350 210 350 180 C350 150 330 130 300 130 Z' fill%3D'%231f2937'%2F%3E%3Cpath d%3D'M300 145 L320 180 L280 180 Z' fill%3D'%23374151'%2F%3E%3Ctext x%3D'50%25' y%3D'75%25' dominant-baseline%3D'middle' text-anchor%3D'middle' font-family%3D'monospace' font-size%3D'16' fill%3D'%236b7280'%3EPreview Offline%3C%2Ftext%3E%3C%2Fsvg%3E";

  // Re-creates the exact same original markup and CSS classes:
  // course-card, course-image, course-body, course-title, course-desc, course-meta, course-footer
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileTap}
      className="course-card"
      style={{ overflow: 'hidden' }}
    >
      <div className="course-image" style={{ position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
        
        {/* YouTube Iframe Embed (Autoplay, Muted=0 for sound, Loop, Controls Hidden) */}
        {showVideo && ytId && (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${ytId}&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
            title={`${course.title} Demo Video`}
            className="absolute inset-0 w-full h-[135%] -top-[17.5%] border-0 pointer-events-none select-none scale-[1.03]"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none', zIndex: 1 }}
          />
        )}

        {/* Course Cover Image */}
        <img
          src={course.imageUrl || placeholderImage}
          alt={course.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-300 ease-in-out"
          style={{
            opacity: showVideo && isVideoPlaying ? 0 : 1,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />

        {/* Loading Spinner for YouTube */}
        {showVideo && !isVideoPlaying && ytId && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-10">
            <div className="w-6 h-6 border-2 border-solid border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Original Course Level Badge */}
        <span 
          className={`course-level-badge ${getLevelName(course.level).toLowerCase()}`} 
          style={{ zIndex: 10, pointerEvents: 'none' }}
        >
          {getLevelName(course.level)}
        </span>

        {/* Small Flashing Preview Badge */}
        <AnimatePresence>
          {showVideo && isVideoPlaying && (
            <span
              className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-[#e50914] text-[9px] font-bold text-white uppercase tracking-wider shadow z-10 pointer-events-none font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Preview Playing
            </span>
          )}
        </AnimatePresence>
      </div>

      <div className="course-body">
        <h5 className="course-title">{course.title}</h5>
        <p className="course-desc">{course.shortDescription}</p>
        
        <div className="course-meta">
          <span><i className="bi bi-clock"></i> {course.durationHours} hrs</span>
          <span><i className="bi bi-people"></i> {course.enrollmentCount} enrolled</span>
        </div>

        <div className="course-footer">
          <span className="course-price">
            {course.price === 0 ? "Free" : `₹${course.price.toLocaleString('en-IN')}`}
          </span>
          <a 
            href={`/Course/Details?slug=${course.slug}`}
            className="btn btn-sm btn-outline-custom"
          >
            View Details <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
