import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'success' | 'prompt' | 'system' | 'profile' | 'loading' | 'file';
  id: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lines, setLines] = useState<LogLine[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [currentTyped, setCurrentTyped] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lines, currentTyped, loadingText, loadingProgress]);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    
    // Set localStorage flag so next visits skip intro
    localStorage.setItem('intro_seen', 'true');
    
    // Trigger CSS fade and scale transition on the main site
    document.documentElement.classList.add('intro-finished');
    
    // Fade out terminal window and overlay
    setIsFading(true);
    
    // Unmount after animation finishes
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  useEffect(() => {
    // Check if intro has already been seen
    const hasSeenIntro = localStorage.getItem('intro_seen') === 'true';
    if (hasSeenIntro) {
      document.documentElement.classList.add('intro-finished');
      setIsVisible(false);
      return;
    }

    let isAborted = false;

    // Listen for Escape key to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const addLine = (text: string, type: LogLine['type']) => {
      if (isAborted) return;
      setLines((prev) => [
        ...prev,
        { text, type, id: Math.random().toString(36).substring(7) },
      ]);
    };

    const typeCommand = async (prompt: string, command: string, pauseAfter = 400) => {
      if (isAborted) return;
      setCurrentPrompt(prompt);
      setIsTyping(true);
      setCurrentTyped('');

      for (let i = 0; i <= command.length; i++) {
        if (isAborted) return;
        setCurrentTyped(command.slice(0, i));
        // Simulate human typing with speed variations
        const delay = command[i - 1] === ' ' ? 110 : 30 + Math.random() * 40;
        await sleep(delay);
      }

      await sleep(150); // Pause briefly before executing
      if (isAborted) return;
      addLine(`${prompt}${command}`, 'prompt');
      setCurrentPrompt('');
      setCurrentTyped('');
      setIsTyping(false);
      await sleep(pauseAfter);
    };

    const runSequence = async () => {
      // Scene 1: Initial 500ms delay, then show prompt
      await sleep(500);
      if (isAborted) return;
      addLine('Microsoft Windows [Version 10.0.26100]', 'system');
      addLine('C:\\Users\\Piyush>', 'output');
      await sleep(300);

      // Scene 2: git init
      await typeCommand('C:\\Users\\Piyush> ', 'git init', 300);
      if (isAborted) return;
      addLine('Initialized empty Git repository in C:\\Users\\Piyush\\Portfolio\\.git\\', 'output');
      await sleep(400);

      // Scene 3: git add .
      await typeCommand('C:\\Users\\Piyush\\Portfolio> ', 'git add .', 300);
      if (isAborted) return;
      addLine('Adding files...', 'output');
      await sleep(100);

      const projectFiles = [
        '✓ src/',
        '✓ components/',
        '✓ assets/',
        '✓ public/',
        '✓ styles/',
        '✓ package.json',
        '✓ README.md',
        '✓ vite.config.js',
        '✓ tailwind.config.js',
        '✓ appsettings.json',
      ];

      for (const file of projectFiles) {
        if (isAborted) return;
        addLine(file, 'file');
        await sleep(25); // Snappy visual listing
      }
      await sleep(400);

      // Scene 4: git commit
      await typeCommand('C:\\Users\\Piyush\\Portfolio> ', 'git commit -m "Build my future"', 300);
      if (isAborted) return;
      addLine('[main 3f19ab2]', 'output');
      addLine('42 files changed', 'output');
      addLine('Backend Connected', 'output');
      addLine('Frontend Compiled', 'output');
      addLine('Database Linked', 'output');
      addLine('Portfolio Ready', 'output');
      await sleep(400);

      // Scene 5: git push
      await typeCommand('C:\\Users\\Piyush\\Portfolio> ', 'git push origin main', 300);
      if (isAborted) return;

      const pushLogs = [
        'Enumerating objects...',
        'Compressing objects...',
        'Writing objects...',
        'Uploading...',
        'Receiving response...',
        'Deployment Successful',
      ];

      for (const log of pushLogs) {
        if (isAborted) return;
        addLine(log, log === 'Deployment Successful' ? 'success' : 'output');
        await sleep(100); // Realistic short network pause
      }
      await sleep(400);

      // Scene 6: Loading portfolio
      if (isAborted) return;
      setLoadingText('Loading Portfolio');
      
      const loadSteps = [10, 30, 60, 90, 100];
      for (const progress of loadSteps) {
        if (isAborted) return;
        setLoadingProgress(progress);
        await sleep(100);
      }
      await sleep(200);
      setLoadingText(''); // Clear loading indicator

      // Scene 7: System checks
      if (isAborted) return;
      addLine('Running System Checks...', 'output');
      await sleep(150);

      const checks = [
        '✔ React Application',
        '✔ ASP.NET Core Backend',
        '✔ SQL Server Connected',
        '✔ Azure Deployment Ready',
        '✔ REST APIs Online',
        '✔ Authentication Loaded',
        '✔ Portfolio Verified',
      ];

      for (const check of checks) {
        if (isAborted) return;
        addLine(check, 'success');
        await sleep(60);
      }
      await sleep(450);

      // Scene 8: Developer profile
      if (isAborted) return;
      addLine('Developer Profile Detected', 'system');
      await sleep(100);
      addLine("Name:\n  Piyush Kumar", 'profile');
      await sleep(80);
      addLine("Role:\n  Full Stack Developer", 'profile');
      await sleep(80);
      addLine("Primary Stack:\n  ASP.NET Core\n  React\n  SQL Server\n  Azure", 'profile');
      await sleep(80);
      addLine("Status:\n  Available for Hiring", 'profile');
      await sleep(500);

      // Scene 9: Launching
      await typeCommand('C:\\Users\\Piyush\\Portfolio> ', 'Launching Portfolio...', 200);
      if (isAborted) return;
      await sleep(200);
      addLine('Welcome Recruiter 👋', 'success');
      await sleep(800);

      // End animation
      handleFinish();
    };

    runSequence();

    return () => {
      isAborted = true;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getProgressBar = (progress: number) => {
    const filledCount = Math.round(progress / 10);
    const emptyCount = 10 - filledCount;
    return '█'.repeat(filledCount) + '░'.repeat(emptyCount) + ` ${progress}%`;
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 select-none font-mono"
        initial={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
        animate={{ 
          backgroundColor: isFading ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)' 
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Skip button in top right */}
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 z-10 px-3 py-1.5 border border-solid border-slate-700/60 rounded bg-black/40 hover:bg-slate-800/40 hover:border-slate-500 text-xs text-slate-400 hover:text-white transition-all duration-200 backdrop-blur cursor-pointer select-none font-mono"
        >
          Skip Intro <span className="opacity-50 text-[10px] ml-1">ESC</span>
        </button>

        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ 
            opacity: isFading ? 0 : 1, 
            scale: isFading ? 1.04 : 1, 
            y: isFading ? -15 : 0 
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl h-[85vh] max-h-[580px] rounded-xl flex flex-col overflow-hidden glass-terminal border border-solid border-white/10"
        >
          {/* macOS Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-solid border-white/5 select-none shrink-0">
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <div 
                onClick={handleFinish} 
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 cursor-pointer flex items-center justify-center transition-colors"
                title="Skip Intro"
              />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            {/* Window Title */}
            <div className="text-[11px] font-medium text-slate-400/80 tracking-wide truncate max-w-[200px] sm:max-w-xs select-none">
              Piyush Kumar — Developer Workstation
            </div>
            {/* Spacer */}
            <div className="w-12 h-3" />
          </div>

          {/* Terminal body */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs md:text-sm leading-relaxed terminal-scrollbar select-text bg-[#000000]/10">
            {/* Render history lines */}
            {lines.map((line) => {
              if (line.type === 'prompt') {
                // Split prompt and typed command
                const isCommandPrompt = line.text.includes('> ');
                const promptPart = isCommandPrompt ? line.text.split('> ')[0] + '> ' : '';
                const cmdPart = isCommandPrompt ? line.text.split('> ').slice(1).join('> ') : line.text;

                return (
                  <div key={line.id} className="mb-2.5">
                    <span className="text-slate-400">{promptPart}</span>
                    <span className="text-[#4ade80] font-semibold">{cmdPart}</span>
                  </div>
                );
              }
              
              if (line.type === 'success') {
                return (
                  <div key={line.id} className="text-[#4ade80] font-semibold mb-2.5 flex items-start gap-1">
                    <span>{line.text}</span>
                  </div>
                );
              }

              if (line.type === 'system') {
                return (
                  <div key={line.id} className="text-sky-400/90 font-medium mb-2.5">
                    {line.text}
                  </div>
                );
              }

              if (line.type === 'profile') {
                return (
                  <div 
                    key={line.id} 
                    className="text-slate-100 bg-white/5 border border-solid border-white/5 rounded-lg p-3 my-3 white-space-pre-wrap leading-relaxed shadow-sm max-w-md"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {line.text}
                  </div>
                );
              }

              if (line.type === 'file') {
                return (
                  <div key={line.id} className="text-slate-400 pl-4 mb-1 text-[11px] md:text-xs">
                    {line.text}
                  </div>
                );
              }

              return (
                <div key={line.id} className="text-slate-200 mb-2.5 whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            })}

            {/* Render loading progress */}
            {loadingText && (
              <div className="mb-3.5 mt-2">
                <div className="text-slate-300 font-semibold">{loadingText}</div>
                <div className="text-[#4ade80] mt-1 font-mono tracking-wider">
                  {getProgressBar(loadingProgress)}
                </div>
              </div>
            )}

            {/* Active cursor / typing line */}
            {isTyping && (
              <div className="mb-2.5 flex items-center">
                <span className="text-slate-400">{currentPrompt}</span>
                <span className="text-[#4ade80] font-semibold">{currentTyped}</span>
                <span className="ml-0.5 w-[7px] h-4 bg-white border border-solid border-white cursor-blink shrink-0" />
              </div>
            )}

            {/* Empty prompt when idle (just cursor blinking) */}
            {!isTyping && !loadingText && !isFading && lines.length > 0 && lines[lines.length - 1].type !== 'success' && (
              <div className="flex items-center mt-1">
                <span className="text-slate-400">C:\Users\Piyush\Portfolio&gt;&nbsp;</span>
                <span className="w-[7px] h-4 bg-white border border-solid border-white cursor-blink shrink-0" />
              </div>
            )}

            {/* Initial cursor if nothing loaded yet */}
            {lines.length === 0 && !isTyping && (
              <div className="flex items-center">
                <span className="w-[7px] h-4 bg-white border border-solid border-white cursor-blink shrink-0" />
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
