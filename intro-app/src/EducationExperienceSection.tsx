import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Minimalist Clean SVG Icons
const AcademicCapIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.6l7.74-4.453M12 4.5L2.25 10.125l9.75 5.625 9.75-5.625L12 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12.75v4.875c0 .621.504 1.125 1.125 1.125h8.25c.621 0 1.125-.504 1.125-1.125V12.75" />
  </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0v3a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-3m16.5 0h-16.5M9 6a2.25 2.25 0 012.25-2.25h3.5A2.25 2.25 0 0117 6v2.25H9V6z" />
  </svg>
);

const BookOpenIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
  </svg>
);

const CodeBracketIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const CommandLineIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

interface CleanTimelineItem {
  id: string;
  roleTitle: string;
  organization: string;
  location?: string;
  duration: string;
  description?: string;
  highlights?: string[];
  badges: { label: string; icon: React.ComponentType<{ className?: string }> }[];
  icon: React.ComponentType<{ className?: string }>;
}

const cleanTimelineData: CleanTimelineItem[] = [
  {
    id: 'exp-1',
    roleTitle: 'Software Developer Intern',
    organization: 'TechWithMD Solution Private Limited',
    location: 'Lucknow',
    duration: '3 Months Internship',
    highlights: [
      'Developed ASP.NET Core applications',
      'Worked with SQL Server',
      'Built REST APIs',
      'Fixed production bugs',
      'Implemented authentication',
      'Worked with Git & GitHub',
      'Learned industry development workflow',
      'Participated in real client projects',
      'Collaborated with senior developers',
    ],
    badges: [
      { label: '🚀 Internship Completed', icon: BriefcaseIcon },
      { label: '💻 Full Stack Developer', icon: CodeBracketIcon },
    ],
    icon: BriefcaseIcon,
  },
  {
    id: 'edu-1',
    roleTitle: 'Diploma in Computer Science & Engineering',
    organization: 'Government Polytechnic Mawanakhurd, Meerut',
    duration: '2022 – 2025',
    highlights: [
      'Learned Data Structures',
      'Database Management',
      'ASP.NET',
      'C#',
      'SQL Server',
      'Software Engineering',
      'Web Development',
      'Built multiple real-world projects',
    ],
    badges: [
      { label: '🎓 Diploma Completed', icon: AcademicCapIcon },
      { label: '💻 Full Stack Developer', icon: CommandLineIcon },
    ],
    icon: AcademicCapIcon,
  },
  {
    id: 'edu-2',
    roleTitle: 'Bachelor of Arts (B.A.)',
    organization: 'P.G. College, Mawana',
    duration: 'Currently Pursuing',
    description:
      'Continuing higher education while focusing on software engineering, full-stack development, and professional growth.',
    badges: [
      { label: '📚 Continuous Learner', icon: BookOpenIcon },
      { label: '🚀 Industry Focused', icon: SparklesIcon },
    ],
    icon: BookOpenIcon,
  },
];

export const EducationExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="education-experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden text-slate-100 font-sans select-none"
    >
      {/* Section Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Education & <span className="text-white underline decoration-white/20 underline-offset-8">Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          My academic journey and hands-on industry experience that built my foundation as a Full Stack .NET Developer.
        </motion.p>
      </div>

      {/* Clean Minimalist Streamline Timeline (No Cards) */}
      <div className="relative pl-6 sm:pl-10 md:pl-12">
        {/* Animated Left Timeline Spine */}
        <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 sm:space-y-16">
          {cleanTimelineData.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Minimal Icon Node */}
                <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-8 h-8 rounded-full border border-white/30 bg-black flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,255,255,0.2)] z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-white">
                  <IconComponent className="w-4 h-4 text-white" />
                </div>

                {/* Content Block (Clean Typography, No Heavy Cards) */}
                <div className="space-y-3">
                  {/* Title & Duration Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-slate-200 transition-colors">
                      {item.roleTitle}
                    </h3>
                    <span className="font-mono text-xs text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                      {item.duration}
                    </span>
                  </div>

                  {/* Organization & Location */}
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-300">
                    <span>{item.organization}</span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
                        • <MapPinIcon className="w-3.5 h-3.5 inline" /> {item.location}
                      </span>
                    )}
                  </div>

                  {/* Description if present */}
                  {item.description && (
                    <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  )}

                  {/* Clean Minimal Bullet List */}
                  {item.highlights && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs sm:text-sm text-slate-300 max-w-4xl">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Animated Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.badges.map((badge, bIdx) => {
                      const BadgeIcon = badge.icon;
                      return (
                        <motion.span
                          key={bIdx}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-slate-200 border border-white/10 transition-colors hover:bg-white/15 hover:text-white"
                        >
                          <BadgeIcon className="w-3.5 h-3.5 text-slate-300" />
                          <span>{badge.label}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationExperienceSection;
