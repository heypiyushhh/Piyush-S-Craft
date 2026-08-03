import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// SVG Icon components to ensure zero missing dependency issues and maximum crispness
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

const CalendarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location?: string;
  duration: string;
  description?: string;
  highlights?: string[];
  badges: { label: string; icon: React.ComponentType<{ className?: string }> }[];
  accentColor: 'emerald' | 'cyan' | 'blue';
  icon: React.ComponentType<{ className?: string }>;
}

const timelineData: TimelineItem[] = [
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Software Developer Intern',
    organization: 'TechWithMD Solution Private Limited',
    location: 'Lucknow, UP',
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
    accentColor: 'cyan',
    icon: BriefcaseIcon,
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'Diploma in Computer Science & Engineering',
    organization: 'Government Polytechnic Mawanakhurd',
    location: 'Meerut, UP',
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
    accentColor: 'emerald',
    icon: AcademicCapIcon,
  },
  {
    id: 'edu-2',
    type: 'education',
    title: 'Bachelor of Arts (B.A.)',
    organization: 'P.G. College',
    location: 'Mawana, UP',
    duration: 'Currently Pursuing',
    description:
      'Continuing higher education while focusing on software engineering, full-stack development, and professional growth.',
    badges: [
      { label: '📚 Continuous Learner', icon: BookOpenIcon },
      { label: '🚀 Industry Focused', icon: SparklesIcon },
    ],
    accentColor: 'blue',
    icon: BookOpenIcon,
  },
];

export const EducationExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for animating the timeline connector line
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-slate-100 font-sans select-none"
    >
      {/* Subtle glowing effects matching existing portfolio theme */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono text-emerald-400 mb-4 shadow-inner"
        >
          <SparklesIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>CAREER & ACADEMICS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6"
        >
          Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
        >
          My academic journey and hands-on industry experience that built my foundation as a Full Stack .NET Developer.
        </motion.p>
      </div>

      {/* Vertical Responsive Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Animated Timeline Connector Line */}
        {/* Mobile: Left (left-6). Tablet: Centered (md:left-1/2). Desktop: Alternating (lg:left-1/2). */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-slate-800/80 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
          />
        </div>

        {/* Timeline Item Cards */}
        <div className="space-y-12 lg:space-y-16">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            const borderGlow =
              item.accentColor === 'emerald'
                ? 'hover:border-emerald-500/40 hover:shadow-emerald-500/10'
                : item.accentColor === 'cyan'
                ? 'hover:border-cyan-500/40 hover:shadow-cyan-500/10'
                : 'hover:border-blue-500/40 hover:shadow-blue-500/10';

            const badgeBg =
              item.accentColor === 'emerald'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : item.accentColor === 'cyan'
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                : 'bg-blue-500/10 text-blue-300 border-blue-500/20';

            const iconBg =
              item.accentColor === 'emerald'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : item.accentColor === 'cyan'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]';

            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row items-start ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Icon Node Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border backdrop-blur-xl ${iconBg} transition-all duration-300`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Empty desktop layout spacer */}
                <div className="hidden lg:block w-1/2" />

                {/* Glassmorphism Card */}
                <div className="w-full lg:w-1/2 pl-16 md:pl-20 lg:pl-0 lg:px-8">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 transition-all duration-300 shadow-xl ${borderGlow}`}
                  >
                    {/* Glass Accent Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl" />

                    {/* Metadata: Duration & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {item.duration}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
                          <MapPinIcon className="w-3.5 h-3.5 text-slate-500" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-slate-300 mt-1 mb-4 flex items-center gap-1.5">
                      <span>{item.organization}</span>
                    </p>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-slate-400 leading-relaxed mb-5">
                        {item.description}
                      </p>
                    )}

                    {/* Bullet Highlights */}
                    {item.highlights && (
                      <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Small Achievement Badges */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {item.badges.map((badge, bIdx) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <motion.span
                            key={bIdx}
                            whileHover={{ scale: 1.06, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm transition-all duration-200 cursor-default ${badgeBg}`}
                          >
                            <BadgeIcon className="w-3.5 h-3.5" />
                            <span>{badge.label}</span>
                          </motion.span>
                        );
                      })}
                    </div>
                  </motion.div>
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
