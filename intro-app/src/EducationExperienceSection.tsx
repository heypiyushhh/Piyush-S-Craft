import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Minimalist Monochrome SVG Icons
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

const RocketIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-1.8a4.2 4.2 0 003.53-4.44h2.31zM9 13.5l-3-3m0 0l-2.25 2.25m2.25-2.25L3.75 6.75m14.25 3.75l3 3m0 0l2.25-2.25m-2.25 2.25l2.25 3.75M12 3a9 9 0 019 9c0 2.21-.8 4.24-2.12 5.8l-1.43-1.43A6.97 6.97 0 0019 12a7 7 0 10-14 0c0 1.6.54 3.08 1.45 4.27L5.02 17.7A8.96 8.96 0 013 12a9 9 0 019-9z" />
  </svg>
);

interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location?: string;
  duration: string;
  journeyHeading: string;
  journeyDescription: string;
  highlightsHeading: string;
  highlights?: string[];
  badges: { label: string; icon: React.ComponentType<{ className?: string }> }[];
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
    journeyHeading: 'My Industry Journey & Experience During Internship',
    journeyDescription:
      'During my 3-month tenure at TechWithMD Solution, I immersed myself in real-world full-stack development. Working closely alongside senior engineers, I learned professional engineering workflows, production debugging, enterprise backend architecture, and seamless API integration. This hands-on experience bridged the gap between academic theory and enterprise-level software delivery.',
    highlightsHeading: 'Key Responsibilities & Deliverables',
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
    type: 'education',
    title: 'Diploma in Computer Science & Engineering',
    organization: 'Government Polytechnic Mawanakhurd',
    location: 'Meerut, UP',
    duration: '2022 – 2025',
    journeyHeading: 'Core Academic Foundation & Technical Skills',
    journeyDescription:
      'During these 3 years of rigorous technical training, I mastered the core pillars of computer science—ranging from Data Structures & Algorithms to Database Systems and Object-Oriented Software Design. I actively spent my college days building end-to-end full-stack applications using ASP.NET Core, C#, and SQL Server.',
    highlightsHeading: 'Subjects Mastered & Technical Highlights',
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
    type: 'education',
    title: 'Bachelor of Arts (B.A.)',
    organization: 'P.G. College',
    location: 'Mawana, UP',
    duration: 'Currently Pursuing',
    journeyHeading: 'Higher Education & Continuous Learning',
    journeyDescription:
      'Continuing higher education while dedicatedly sharpening software engineering expertise, full-stack .NET architectures, modern frontend technologies, and building software solutions for continuous professional growth.',
    highlightsHeading: 'Focus Areas & Objectives',
    badges: [
      { label: '📚 Continuous Learner', icon: BookOpenIcon },
      { label: '🚀 Industry Focused', icon: SparklesIcon },
    ],
    icon: BookOpenIcon,
  },
];

export const EducationExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for animating monochrome timeline connector line
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden text-slate-100 font-sans select-none"
    >
      {/* Black & White Glass Ambient Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-mono text-slate-300 mb-4 shadow-inner"
        >
          <SparklesIcon className="w-4 h-4 text-slate-300" />
          <span>CAREER & ACADEMICS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6"
        >
          Education & <span className="text-white underline decoration-white/20 underline-offset-8">Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          My academic journey and hands-on industry experience that built my foundation as a Full Stack .NET Developer.
        </motion.p>
      </div>

      {/* Full Width Vertical Responsive Timeline */}
      <div className="relative w-full mx-auto">
        {/* Animated Pure White Timeline Connector Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
          />
        </div>

        {/* Timeline Item Cards */}
        <div className="space-y-14 lg:space-y-20">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
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
                {/* Black & White Timeline Icon Node Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/30 bg-black/90 text-white backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:border-white/60"
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Empty desktop layout spacer */}
                <div className="hidden lg:block w-1/2" />

                {/* Pure Black & White Glassmorphism Card (Full Width Utilized) */}
                <div className="w-full lg:w-1/2 pl-16 md:pl-20 lg:pl-0 lg:px-10">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="group relative rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 p-6 sm:p-10 transition-all duration-300 shadow-2xl hover:border-white/40 hover:shadow-[0_12px_40px_rgba(255,255,255,0.08)]"
                  >
                    {/* Glass White Highlight Line */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />

                    {/* Header Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-medium text-white bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full">
                        <CalendarIcon className="w-4 h-4 text-slate-300" />
                        {item.duration}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-mono">
                          <MapPinIcon className="w-4 h-4 text-slate-500" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-slate-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg font-semibold text-slate-300 mt-1 mb-6">
                      {item.organization}
                    </p>

                    {/* Journey Heading & Detailed Description */}
                    <div className="mb-6 p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10">
                      <h4 className="text-xs sm:text-sm uppercase tracking-wider font-mono font-semibold text-white mb-2 flex items-center gap-2">
                        <RocketIcon className="w-4 h-4 text-slate-300" />
                        {item.journeyHeading}
                      </h4>
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {item.journeyDescription}
                      </p>
                    </div>

                    {/* Highlights Heading & Bullet Highlights */}
                    {item.highlights && (
                      <div className="mb-6">
                        <h4 className="text-xs sm:text-sm uppercase tracking-wider font-mono font-semibold text-slate-400 mb-3">
                          {item.highlightsHeading}
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-200">
                          {item.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 bg-white/5 border border-white/5 p-2 rounded-lg">
                              <CheckCircleIcon className="w-4 h-4 text-white shrink-0 mt-0.5" />
                              <span className="leading-snug">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Small Achievement Badges */}
                    <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/15">
                      {item.badges.map((badge, bIdx) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <motion.span
                            key={bIdx}
                            whileHover={{ scale: 1.06, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-sm transition-all duration-200 cursor-default hover:bg-white/20 hover:border-white/40"
                          >
                            <BadgeIcon className="w-4 h-4 text-slate-300" />
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
