import portfolioData from "@/data/portfolio.json";
import { Code2, Mail } from "lucide-react";

export function Footer() {
  const { name, socials, email } = portfolioData.personal;

  return (
    <footer className="bg-panel border-t border-hairline py-16 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="font-display text-2xl font-medium text-ghost tracking-tight">{name}</h2>
          <p className="font-mono text-xs text-static uppercase tracking-widest">Building systems that scale.</p>
        </div>

        <div className="flex items-center gap-6">
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-static hover:text-ghost transition-colors">
            <span className="sr-only">GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-static hover:text-ghost transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="text-static hover:text-ghost transition-colors">
            <span className="sr-only">LeetCode</span>
            <Code2 className="w-5 h-5" />
          </a>
          <a href={`mailto:${email}`} className="text-static hover:text-ghost transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-wave-violet/5 blur-[100px] pointer-events-none" />
    </footer>
  );
}
