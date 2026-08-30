"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { FiDownload, FiMessageSquare, FiBookOpen, FiLink, FiExternalLink } from "react-icons/fi";
import { SiGithub, SiGitlab, SiStackoverflow, SiX } from "react-icons/si";
import { FaLinkedin, FaRobot } from "react-icons/fa6";

import FloatingHeader from "../components/FloatingHeader";
import SkillAccordion from "../components/SkillAccordion";
import SocialButton from "../components/SocialButton";
import { skillCategories } from "../data/skills";
import ContactModal from "../components/ContactModal";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("About");
  
  // Converted to an array to allow multiple open accordions
  const [openSkills, setOpenSkills] = useState<number[]>([0]);

  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleSkill = (index: number) => {
    setOpenSkills((prev) => 
      prev.includes(index) 
        ? prev.filter((i) => i !== index) 
        : [...prev, index]
    );
  };

  // --- HERO SCROLL ANIMATION LOGIC ---
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end center"] 
  });

  // Tamed starting positions so they stay well within the screen on landing
  const textStartX = "-8vw"; 
  const imgStartX = "8vw";   

  // Reduced the horizontal travel distance so lines 1 and 3 stay in frame
  const line1X = useTransform(scrollYProgress, [0, 1], [textStartX, "-20vw"]);
  const line1Y = useTransform(scrollYProgress, [0, 1], ["-20vh", "-25vh"]);

  const line2X = useTransform(scrollYProgress, [0, 1], [textStartX, "15vw"]);
  const line2Y = useTransform(scrollYProgress, [0, 1], ["-7vh", "-8vh"]);

  const line3X = useTransform(scrollYProgress, [0, 1], [textStartX, "-16vw"]);
  const line3Y = useTransform(scrollYProgress, [0, 1], ["6vh", "12vh"]);

  const line4X = useTransform(scrollYProgress, [0, 1], [textStartX, "18vw"]);
  const line4Y = useTransform(scrollYProgress, [0, 1], ["19vh", "22vh"]);

  const imgX = useTransform(scrollYProgress, [0, 1], [imgStartX, "0vw"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div className="w-full">
      <FloatingHeader />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* 1. HERO SECTION (3D SCATTER SCROLL) */}
      <section ref={heroRef} className="h-[200vh] bg-[#d9cffd] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12">
          <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center h-full">
            
            {/* LAYER 1: BEHIND THE IMAGE (Z-10) */}
            <motion.div style={{ x: line1X, y: line1Y }} className="absolute z-10 pointer-events-none">
              <h1 className="font-serif text-[3.25rem] md:text-[5rem] leading-none text-[#171026] tracking-tight whitespace-nowrap">
                Full-stack engineer
              </h1>
            </motion.div>
            
            <motion.div style={{ x: line4X, y: line4Y }} className="absolute z-10 pointer-events-none">
              <h1 className="font-serif text-[3.25rem] md:text-[5rem] leading-none text-[#171026] tracking-tight whitespace-nowrap">
                by nature.
              </h1>
            </motion.div>

            {/* LAYER 2: THE IMAGE (Z-20) */}
            {/* Constrained to 55vh (mobile) and 75vh (desktop) so it NEVER clips off the screen vertically */}
            <motion.div style={{ x: imgX, scale: imgScale }} className="absolute z-20 flex justify-center h-[55vh] md:h-[75vh] shrink-0">
              <img 
                src="/avatar.png" 
                alt="Shubham" 
                className="h-full w-auto object-contain object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]" 
              />
            </motion.div>

            {/* LAYER 3: IN FRONT OF THE IMAGE (Z-30) */}
            <motion.div style={{ x: line2X, y: line2Y }} className="absolute z-30 pointer-events-none">
              <h1 className="font-serif text-[3.25rem] md:text-[5rem] leading-none text-[#7b46ea] tracking-tight drop-shadow-xl whitespace-nowrap">
                by obsession(),
              </h1>
            </motion.div>

            <motion.div style={{ x: line3X, y: line3Y }} className="absolute z-30 pointer-events-none">
              <h1 className="font-serif text-[3.25rem] md:text-[5rem] leading-none text-[#171026] tracking-tight drop-shadow-xl whitespace-nowrap">
                AI & ML enthusiast
              </h1>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. QUOTE SECTION */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={containerVariants} className="bg-plum py-32 px-6 flex flex-col items-center justify-center text-center relative z-20">
        <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl text-white mb-6">“Design for scanning, not for reading.”</motion.h2>
        <motion.p variants={itemVariants} className="text-[#7b46ea] tracking-[0.2em] text-sm font-semibold uppercase mb-16">— Steve Krug</motion.p>
        <motion.div variants={itemVariants} className="w-full max-w-4xl h-[400px] mx-auto bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
           <img src="/quote-image.gif" alt="Aesthetic Tech" className="w-full h-full object-cover opacity-100" />
        </motion.div>
      </motion.section>

      {/* 3. DYNAMIC TAB SECTION */}
      <section className="grid-bg-lavender py-24 px-6 flex flex-col items-center min-h-[80vh]">
        <motion.nav initial="hidden" whileInView="show" viewport={{ once: true }} variants={itemVariants} className="bg-white w-full max-w-4xl mx-auto px-2 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex justify-center items-center gap-2 sm:gap-4 mb-20 overflow-x-auto text-[15px] z-10">
          {["About", "Experience", "Projects", "Open Source"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 sm:px-8 py-3.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab ? "bg-[#171026] text-white shadow-md scale-100" : "text-gray-500 hover:text-[#171026] scale-95 hover:scale-100"}`}>
              {tab}
            </button>
          ))}
        </motion.nav>

        <div className="max-w-4xl w-full">
          {activeTab === "About" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-4">About Me</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-10">The story so far</motion.h2>
              <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-lg text-gray-700 leading-relaxed space-y-6 mb-16">
                <p>I'm Shivam, an IST student, which means I was supposed to spend my time thinking about financial statements and corporate law. I still do—especially when diving into CAT prep for IIM Calcutta—but somewhere along the way, my curiosity pushed me into building complete, full-stack software applications from scratch.</p>
                <p>Beyond traditional web development, I am deeply enthusiastic about Artificial Intelligence. I actively study Machine Learning, Agentic AI, and Generative AI, exploring how autonomous agents can be integrated into dynamic, real-world systems.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-6">Connect With Me</p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <SocialButton icon={SiGithub} label="GitHub" color="#2dba4e" />
                  <SocialButton icon={SiGitlab} label="GitLab" color="#FC6D26" />
                  <SocialButton icon={SiStackoverflow} label="StackOverflow" color="#F58025" />
                  <SocialButton icon={FaLinkedin} label="LinkedIn" color="#0A66C2" />
                  <SocialButton icon={SiX} label="X (Twitter)" color="#14171A" />
                  <SocialButton icon={FaRobot} label="Bot View" color="#00B4D8" />
                </div>
                <button className="flex items-center gap-2 px-6 py-3.5 bg-[#7b46ea] text-white rounded-xl font-medium shadow-lg shadow-[#7b46ea]/30 hover:bg-[#6835d1] transition-colors">
                  <FiDownload size={18} /> Download Resume
                </button>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "Experience" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Experience</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-14">The journey</motion.h2>
              <div className="relative border-l-2 border-[#d9cffd] ml-4 md:ml-6 pb-10">
                <motion.div variants={itemVariants} className="relative pl-8 md:pl-12 mb-12">
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-[#7b46ea] border-4 border-white"></div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-2xl font-semibold text-[#171026]">Full Stack Intern</h3>
                      <span className="mt-3 md:mt-0 px-4 py-1.5 bg-[#d9cffd]/50 text-[#7b46ea] text-xs font-bold tracking-wider rounded-full w-fit">MAY 2026 - PRESENT</span>
                    </div>
                    <p className="text-gray-500 font-medium mb-4">Aediax Tech Private Limited</p>
                    <p className="text-gray-600 leading-relaxed">Developing and optimizing agentic workflows for enterprise LLM integration. Contributing to low-latency prompt routing and establishing robust context-memory architectures.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "Projects" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Projects</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-10">Things I've built</motion.h2>

              <div className="space-y-10">
                
                {/* Project 1 */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-4 flex flex-col md:flex-row gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="w-full md:w-1/2 bg-[#171026] rounded-3xl h-72 p-8 flex flex-col justify-center text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#7b46ea]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-3xl font-bold mb-2 relative z-10">Agentic IDE</h3>
                    <p className="text-[#7b46ea] font-medium relative z-10">Build AI agents in seconds.</p>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center pr-6 pb-6 md:pb-0">
                    <h3 className="text-3xl font-semibold text-[#171026] mb-3">Nexus Agent</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      <strong className="text-[#171026]">Infrastructure for AI</strong> — deterministic workflows, isolated vector databases, and parallel processing for autonomous AI task execution.
                    </p>
                    <div className="flex items-center gap-6 font-medium text-[#7b46ea]">
                      <a href="#" className="flex items-center gap-2 hover:text-[#171026] transition-colors">Learn More <FiExternalLink /></a>
                    </div>
                  </div>
                </motion.div>

                {/* Project 2 */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-4 flex flex-col md:flex-row-reverse gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="w-full md:w-1/2 bg-[#d9cffd] rounded-3xl h-72 p-8 flex flex-col justify-center text-[#171026] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-3xl font-bold mb-2 relative z-10">DataFlow Analytics</h3>
                    <p className="text-[#7b46ea] font-medium relative z-10">Full-stack Postgres dashboard.</p>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center pl-6 pb-6 md:pb-0">
                    <h3 className="text-3xl font-semibold text-[#171026] mb-3">Enterprise Dashboard</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      <strong className="text-[#171026]">Automated analytics</strong> — React and PostgreSQL integration fully automating data entry streams to eliminate manual transcription errors.
                    </p>
                    <div className="flex items-center gap-6 font-medium text-[#7b46ea]">
                      <a href="#" className="flex items-center gap-2 hover:text-[#171026] transition-colors">Learn More <FiExternalLink /></a>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}

          {activeTab === "Open Source" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Open Source</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-10">Contributions</motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={itemVariants} className="block bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(123,70,234,0.1)] transition-shadow border border-transparent hover:border-[#d9cffd] h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#171026] text-white rounded-xl flex items-center justify-center text-xl font-bold">L</div>
                      <div>
                        <h3 className="text-xl font-bold text-[#171026]">LangChain</h3>
                        <p className="text-sm text-gray-500">@langchain-ai</p>
                      </div>
                    </div>
                    <FiExternalLink className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 flex-grow">Contributed to optimizing prompt template routing and memory context handling for autonomous agents.</p>
                </motion.a>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* 4. EXPANDED SKILLS SECTION */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} className="bg-plum py-32 px-6" id="skills">
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={itemVariants} className="font-serif text-5xl text-white text-center mb-16">Technologies & Frameworks</motion.h2>
          <div className="space-y-4">
            {skillCategories.map((category, index) => (
              <SkillAccordion 
                key={category.title} 
                category={category} 
                index={index} 
                openSkill={openSkills.includes(index) ? index : null} 
                toggleSkill={toggleSkill} 
                itemVariants={itemVariants} 
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. PERSONAL SECTION & FIND ME */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} className="bg-[#d9cffd] py-32 px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
            <motion.div variants={itemVariants}>
              <p className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Personal</p>
              <h2 className="font-serif text-6xl text-[#171026] mb-12">This & That.</h2>
              <ul className="space-y-6 text-lg text-[#171026]/80 font-medium">
                <li className="flex items-center gap-4">🏋️ weight training <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> cardio</li>
                <li className="flex items-center gap-4">🧩 sudoku & rubik's <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> scrolling</li>
                <li className="flex items-center gap-4">🧠 agentic workflows <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> manual tasks</li>
                <li className="flex items-center gap-4">🌙 late nights <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> early mornings</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
               <p className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-6 flex items-center gap-2">
                 🎵 Currently Listening
               </p>
               <div className="w-full bg-[#171026] rounded-3xl p-2 overflow-hidden shadow-xl">
                 <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-2xl"></iframe>
               </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[#c6baf7] pt-24">
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <div className="mb-12">
                <h3 className="font-serif text-2xl italic text-[#171026] mb-4">Want to collaborate or discuss a project?</h3>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center gap-2 w-full md:w-auto justify-center px-8 py-4 bg-[#7b46ea] text-white rounded-2xl font-semibold shadow-lg shadow-[#7b46ea]/20 hover:bg-[#6835d1] transition-colors"><FiMessageSquare size={18} /> Chat with me</button>
              </div>
              <div>
                <h3 className="font-serif text-2xl italic text-[#171026] mb-4">Haven't found a common interest yet?</h3>
                <button className="flex items-center gap-2 w-full md:w-auto justify-center px-8 py-4 bg-[#7b46ea] text-white rounded-2xl font-semibold shadow-lg shadow-[#7b46ea]/20 hover:bg-[#6835d1] transition-colors"><FiBookOpen size={18} /> Explore my bookshelf</button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pl-0 md:pl-12 border-none md:border-l border-white/40">
               <p className="text-[#7b46ea] tracking-[0.15em] text-xs font-bold uppercase mb-8 flex items-center gap-2"><FiLink size={14} /> Find Me</p>
               <ul className="space-y-6 text-[#171026] font-medium text-lg">
                 <li><a href="#" className="flex items-center gap-4 hover:text-[#7b46ea] transition-colors"><span className="text-2xl">🐙</span> GitHub</a></li>
                 <li><a href="#" className="flex items-center gap-4 hover:text-[#7b46ea] transition-colors"><span className="text-2xl">💼</span> LinkedIn</a></li>
                 <li><a href="#" className="flex items-center gap-4 hover:text-[#7b46ea] transition-colors"><span className="text-2xl">🐦</span> Twitter / X</a></li>
                 <li><a href="mailto:shubham@example.com" className="flex items-center gap-4 hover:text-[#7b46ea] transition-colors"><span className="text-2xl">📧</span> Email</a></li>
               </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. GITHUB & FOOTER SECTION */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="bg-plum pt-32 pb-16 px-6 relative overflow-hidden flex flex-col items-center">
        <div className="max-w-6xl w-full z-10 mb-20">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-2">Open Source</p>
              <h2 className="font-serif text-5xl text-white">GitHub activity</h2>
            </div>
            <a href="https://github.com/shubham" className="text-[#7b46ea] hover:text-white transition">@Shivam</a>
          </motion.div>
          
          {/* Managed Calendar Wrapper */}
          <motion.div variants={itemVariants} className="bg-[#171026] border border-white/5 p-6 md:p-10 rounded-3xl overflow-hidden flex justify-center mb-32 w-full">
            <div className="w-full max-w-4xl flex justify-center overflow-x-auto pb-4 custom-scrollbar">
              <GitHubCalendar username="shubham" colorScheme="dark" theme={{ light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], dark: ['#171026', '#2a1a4a', '#47238a', '#7b46ea', '#a785f0'] }} />
            </div>
          </motion.div>

          {/* Footer Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white/80">
            <div className="max-w-sm">
              <h3 className="font-serif text-5xl text-white mb-6">Let's build<br/>something together.</h3>
              <p className="text-white/50 text-sm leading-relaxed">Always open to new ideas, collaborations, and interesting challenges.</p>
            </div>
            <div>
              <p className="text-white/40 text-xs font-bold tracking-[0.15em] uppercase mb-6">Navigate</p>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white/40 text-xs font-bold tracking-[0.15em] uppercase mb-6">Connect</p>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Watermark & Copyright */}
        <h1 className="absolute bottom-12 left-0 right-0 font-serif text-[18vw] leading-none text-center text-white/[0.02] select-none pointer-events-none">SHIVAM</h1>
        <div className="z-10 text-white/30 text-[11px] text-center w-full mt-4">© 2026 Shivam. All rights reserved.</div>
      </motion.section>
    </div>
  );
}