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

const SparklesIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const TerminalIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

interface MilestoneItem {
  id: string;
  type: 'experience' | 'education';
  command: string;
  roleTitle: string;
  organization: string;
  location?: string;
  duration: string;
  story: string;
  highlights: string[];
  badges: { label: string; icon: React.ComponentType<{ className?: string }> }[];
}

const milestonesData: MilestoneItem[] = [
  {
    id: 'exp-1',
    type: 'experience',
    command: 'cat ~/experience/techwithmd_internship.log',
    roleTitle: 'Software Developer Intern',
    organization: 'TechWithMD Solution Private Limited',
    location: 'Lucknow, UP',
    duration: '3 Months Internship',
    story:
      'During my 3-month internship at TechWithMD Solution, I immersed myself in real-world full-stack development. Working closely with senior developers, I built ASP.NET Core applications, optimized SQL Server queries, integrated RESTful APIs, fixed production bugs, and implemented user authentication while following standard Git engineering workflows on client projects.',
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
  },
  {
    id: 'edu-1',
    type: 'education',
    command: 'cat ~/education/diploma_computer_science.log',
    roleTitle: 'Diploma in Computer Science & Engineering',
    organization: 'Government Polytechnic Mawanakhurd',
    location: 'Meerut, UP',
    duration: '2022 – 2025',
    story:
      'Mastered core computer science principles over 3 years of intensive academic study. Built strong fundamentals in Data Structures, Database Systems, Software Engineering, ASP.NET, C#, and SQL Server while engineering multiple full-stack projects.',
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
  },
  {
    id: 'edu-2',
    type: 'education',
    command: 'cat ~/education/bachelor_of_arts.log',
    roleTitle: 'Bachelor of Arts (B.A.)',
    organization: 'P.G. College',
    location: 'Mawana, UP',
    duration: 'Currently Pursuing',
    story:
      'Continuing higher education while focusing heavily on software engineering, full-stack .NET development, and continuous self-driven skill enhancement.',
    highlights: [
      'Focusing on Software Engineering',
      'Full Stack .NET & React Ecosystem',
      'Continuous Professional Growth',
    ],
    badges: [
      { label: '📚 Continuous Learner', icon: BookOpenIcon },
      { label: '🚀 Industry Focused', icon: SparklesIcon },
    ],
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
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden text-slate-100 font-sans select-none"
    >
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300 mb-4 shadow-inner"
        >
          <TerminalIcon className="w-4 h-4 text-slate-300" />
          <span>DEVELOPER LOGS & MILESTONES</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5"
        >
          Education & <span className="text-white underline decoration-white/20 underline-offset-8">Experience</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          My academic journey and hands-on industry experience that built my foundation as a Full Stack .NET Developer.
        </motion.p>
      </div>

      {/* Interactive Terminal Timeline Stream */}
      <div className="relative pl-6 md:pl-10">
        {/* Animated Left Timeline Spine Line */}
        <div className="absolute left-2 md:left-4 top-2 bottom-2 w-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          />
        </div>

        {/* Milestone Terminal Blocks */}
        <div className="space-y-16">
          {milestonesData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Connector Dot Node */}
              <div className="absolute -left-[23px] md:-left-[39px] top-6 w-5 h-5 rounded-full border-2 border-white bg-black flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 transition-transform duration-300 group-hover:scale-125">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>

              {/* Developer Terminal Code Window */}
              <div className="rounded-xl border border-white/15 bg-[#09090b] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/40 group-hover:shadow-[0_10px_35px_rgba(255,255,255,0.05)]">
                {/* Terminal Title Bar Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white/20 border border-white/30 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-white/15 border border-white/20 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-white/10 border border-white/10 inline-block" />
                    <span className="ml-2 text-slate-300 font-semibold text-[11px] md:text-xs">
                      {item.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {item.duration}
                    </span>
                    {item.location && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Terminal Body Content */}
                <div className="p-6 md:p-8 font-mono">
                  {/* CLI Command Shell prompt */}
                  <div className="flex items-center gap-2 text-xs md:text-sm mb-4 text-slate-400 pb-3 border-b border-white/5">
                    <span className="text-white font-bold">$</span>
                    <span className="text-slate-200">{item.command}</span>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-4">
                    {item.roleTitle}
                  </h3>

                  {/* Experience Story */}
                  <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                    {item.story}
                  </p>

                  {/* Tech Deliverable Badges Grid */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
                      HIGHLIGHTS & DELIVERABLES:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-sans text-xs">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievement Badges Footer */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-sans">
                    {item.badges.map((b, i) => {
                      const BadgeIcon = b.icon;
                      return (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-white border border-white/20 transition-all duration-200 hover:bg-white/20"
                        >
                          <BadgeIcon className="w-3.5 h-3.5" />
                          <span>{b.label}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationExperienceSection;
