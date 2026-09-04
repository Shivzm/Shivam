"use client";

import React from "react";
import { Tooltip } from "react-tooltip";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { FiDownload, FiMessageSquare, FiLink, FiExternalLink } from "react-icons/fi";
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
              <h1 className="font-serif text-[3.25rem] md:text-[5rem] leading-none text-[#7c3aed] tracking-tight drop-shadow-xl whitespace-nowrap">
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
        <motion.p variants={itemVariants} className="text-[#7c3aed] tracking-[0.2em] text-sm font-semibold uppercase mb-16">— Steve Krug</motion.p>
        <motion.div variants={itemVariants} className="w-full max-w-4xl h-[400px] mx-auto bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
           <img src="/quote-image.gif" alt="Aesthetic Tech" className="w-full h-full object-cover opacity-100" />
        </motion.div>
      </motion.section>

      {/* 3. DYNAMIC TAB SECTION */}
      <section className="relative py-32 px-6 flex flex-col items-center min-h-screen bg-[#fcfbff]">
        
        {/* Absolute Grid Background with Top/Bottom Edge Fade */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ebe5fa 1px, transparent 1px), linear-gradient(to bottom, #ebe5fa 1px, transparent 1px)`,
            backgroundSize: `80px 80px`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
            maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
          }}
        />

        <div className="relative z-10 w-full max-w-4xl">
          
          {/* Navigation Bar */}
          <motion.nav initial="hidden" whileInView="show" viewport={{ once: true }} variants={itemVariants} className="bg-white w-full px-2 py-2 rounded-full border border-[#ebe5fa] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex justify-center items-center gap-2 sm:gap-6 mb-24 overflow-x-auto text-[15px]">
            {["About", "Experience", "Projects", "Open Source"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 sm:px-8 py-3.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab ? "bg-[#171026] text-white shadow-md" : "text-gray-500 hover:text-[#171026]"}`}>
                {tab}
              </button>
            ))}
          </motion.nav>

          {/* Tab Content */}
          {activeTab === "About" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7c3aed] tracking-[0.2em] text-xs font-semibold uppercase mb-4">About Me</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-5xl md:text-6xl text-[#171026] mb-10">The story so far</motion.h2>
              
              <motion.div variants={itemVariants} className="bg-white p-10 md:p-12 rounded-[2rem] border border-[#ebe5fa] shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-lg text-[#171026]/80 font-medium leading-relaxed space-y-6 mb-16">
                <p>I'm Shivam, an IST student, which means I was supposed to spend my time thinking about systems architecture, database management, and network protocols. I still do, but somewhere along the way, my curiosity pushed me beyond standard coursework into building complete, full-stack software applications from scratch.</p>
                <p>Beyond traditional web development, I am deeply enthusiastic about Artificial Intelligence. I actively study Machine Learning, Agentic AI, and Generative AI, exploring how autonomous agents can be integrated into dynamic, real-world systems.</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-[#7c3aed] tracking-[0.2em] text-xs font-semibold uppercase mb-6">Connect With Me</p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <SocialButton href="https://github.com/shivzm" icon={SiGithub} label="GitHub" color="#2dba4e" />
                  <SocialButton href="https://gitlab.com/ShivamMukherjee" icon={SiGitlab} label="GitLab" color="#FC6D26" />
                  <SocialButton href="https://stackoverflow.com/users/33091158/shivam-mukherjee" icon={SiStackoverflow} label="StackOverflow" color="#F58025" />
                  <SocialButton href="https://linkedin.com/in/shivammukherjee" icon={FaLinkedin} label="LinkedIn" color="#0A66C2" />
                  <SocialButton href="https://twitter.com/shivaxn" icon={SiX} label="X (Twitter)" color="#14171A" />
                </div>
                
                <a 
                  href="/resume.pdf" 
                  download="Shivam_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#7c3aed] text-white rounded-xl font-medium shadow-lg shadow-[#7c3aed]/30 hover:bg-[#6b21a8] transition-colors w-fit"
                >
                  <FiDownload size={18} /> Download Resume
                </a>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "Experience" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7c3aed] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Experience</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-14">The journey</motion.h2>
              <div className="relative border-l-2 border-[#d9cffd] ml-4 md:ml-6 pb-10">
                <motion.div variants={itemVariants} className="relative pl-8 md:pl-12 mb-12">
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-[#7c3aed] border-4 border-white"></div>
                  <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-2xl font-semibold text-[#171026]">Full Stack Intern</h3>
                      <span className="mt-3 md:mt-0 px-4 py-1.5 bg-[#d9cffd]/50 text-[#7c3aed] text-xs font-bold tracking-wider rounded-full w-fit">MAY 2026 - PRESENT</span>
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
              <motion.p variants={itemVariants} className="text-[#7c3aed] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Projects</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-10">Things I&apos;ve built</motion.h2>

              <div className="space-y-10">
                
                {/* Project 1 */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-4 flex flex-col md:flex-row gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="w-full md:w-1/2 bg-[#171026] rounded-3xl h-72 p-8 flex flex-col justify-center text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#7c3aed]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 className="text-3xl font-bold mb-2 relative z-10">Agentic Chatbot</h3>
                    <p className="text-[#7c3aed] font-medium relative z-10">Simple LLM agent chatbot with ReAct architecture.</p>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center pr-6 pb-6 md:pb-0">
                    <h3 className="text-3xl font-semibold text-[#171026] mb-3">Nexus Agent</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      <strong className="text-[#171026]">AI LLM-ReAct chatbot</strong> — summarize findings, search news using websearch, create reports.
                    </p>
                    <div className="flex items-center gap-6 font-medium text-[#7c3aed]">
                      <a href="https://github.com/Shivzm/Agentic-LLM-Chatbot-System" className="flex items-center gap-2 hover:text-[#171026] transition-colors">Learn More <FiExternalLink /></a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* {activeTab === "Open Source" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7c3aed] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Open Source</motion.p>
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
          )} */}

          {activeTab === "Open Source" && (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.p variants={itemVariants} className="text-[#7b46ea] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Open Source</motion.p>
              <motion.h2 variants={itemVariants} className="font-serif text-6xl text-[#171026] mb-10">Contributions</motion.h2>

              <motion.div variants={itemVariants} className="bg-white/60 p-12 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-2 border-dashed border-[#c6baf7] flex flex-col items-center justify-center text-center min-h-[320px]">
                <div className="w-16 h-16 bg-[#d9cffd] text-[#7b46ea] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                  <SiGithub />
                </div>
                <h3 className="text-2xl font-bold text-[#171026] mb-3">Brewing Contributions</h3>
                <p className="text-gray-600 max-w-md leading-relaxed font-medium">
                  I am currently studying open-source codebases and preparing my first pull requests, specifically focusing on AI frameworks and autonomous agent ecosystems. Check back soon!
                </p>
              </motion.div>
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
              <p className="text-[#7c3aed] tracking-[0.15em] text-xs font-semibold uppercase mb-4">Personal</p>
              <h2 className="font-serif text-6xl text-[#171026] mb-12">This & That.</h2>
              <ul className="space-y-6 text-lg text-[#171026]/80 font-medium">
                <li className="flex items-center gap-4">🏋️ weight training <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> cardio</li>
                <li className="flex items-center gap-4">🧩 sudoku & rubik&apos;s <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> scrolling</li>
                <li className="flex items-center gap-4">🧠 agentic workflows <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> manual tasks</li>
                <li className="flex items-center gap-4">🌙 late nights <span className="text-sm text-[#171026]/40 uppercase tracking-widest">over</span> early mornings</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
               <p className="text-[#7c3aed] tracking-[0.15em] text-xs font-semibold uppercase mb-6 flex items-center gap-2">
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
                  className="flex items-center gap-2 w-full md:w-auto justify-center px-8 py-4 bg-[#7c3aed] text-white rounded-2xl font-semibold shadow-lg shadow-[#7c3aed]/20 hover:bg-[#6835d1] transition-colors"><FiMessageSquare size={18} /> Chat with me</button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pl-0 md:pl-12 border-none md:border-l border-white/40">
               <p className="text-[#7c3aed] tracking-[0.15em] text-xs font-bold uppercase mb-8 flex items-center gap-2"><FiLink size={14} /> Find Me</p>
               <ul className="space-y-6 text-[#171026] font-medium text-lg">
                 <li><a href="https://github.com/shivzm" className="flex items-center gap-4 hover:text-[#7c3aed] transition-colors"><span className="text-2xl">🐙</span> GitHub</a></li>
                 <li><a href="https://www.linkedin.com/shivammukherjee" className="flex items-center gap-4 hover:text-[#7c3aed] transition-colors"><span className="text-2xl">💼</span> LinkedIn</a></li>
                 <li><a href="https://x.com/shivxan" className="flex items-center gap-4 hover:text-[#7c3aed] transition-colors"><span className="text-2xl">🐦</span> Twitter / X</a></li>
                 <li><a href="mailto:shibhammukherjee6@gmail.com" className="flex items-center gap-4 hover:text-[#7c3aed] transition-colors"><span className="text-2xl">📧</span> Email</a></li>
               </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6. GITHUB & FOOTER SECTION */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="bg-plum pt-32 px-6 relative overflow-hidden flex flex-col items-center">
        
        {/* Removed the mb-20 margin from this wrapper to kill the huge gap */}
        <div className="max-w-6xl w-full z-10">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[#7c3aed] tracking-[0.15em] text-xs font-semibold uppercase mb-2">Open Source</p>
              <h2 className="font-serif text-5xl text-white">GitHub activity</h2>
            </div>
            
            {/* Animated Underline Link */}
            <a href="https://github.com/shivzm" className="text-[#7c3aed] relative group inline-block pb-1">
              @Shivam
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7c3aed] transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          </motion.div>
          
          {/* Managed Calendar Wrapper with Tooltips */}
          <motion.div variants={itemVariants} className="bg-[#1e1533] border border-white/5 p-8 md:p-10 rounded-[2rem] overflow-hidden flex flex-col mb-24 w-full text-[#8b849b]">
            <div className="w-full flex justify-center overflow-x-auto pb-4 custom-scrollbar">
              <GitHubCalendar 
                username="shivzm" 
                colorScheme="dark" 
                blockSize={14}
                blockMargin={5}
                blockRadius={4}
                theme={{ 
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'], 
                  dark: [
                    '#281e3d', 
                    '#553b92', 
                    '#7c3aed', 
                    '#a785f0', 
                    '#d9cffd'  
                  ] 
                }}
                renderBlock={(block, activity) => React.cloneElement(block, {
                  "data-tooltip-id": "github-tooltip",
                  "data-tooltip-content": `${activity.count} contributions on ${activity.date}`
                } as any)}
              />
              <Tooltip 
                id="github-tooltip" 
                className="!bg-[#171026] !text-[#8b849b] !rounded-xl !text-sm !shadow-xl !px-4 !py-2 !border !border-white/10 !z-50" 
              />
            </div>
          </motion.div>

          {/* Footer Grid - Removed bottom padding */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between w-full pt-10 pb-0">
            
            {/* Left Column */}
            <div className="w-full lg:w-2/5 mb-16 lg:mb-0">
              <h3 className="font-serif text-[4rem] md:text-[5.5rem] leading-[1.05] text-white mb-8 tracking-tight">
                Let's build<br/>something<br/>together.
              </h3>
              <p className="text-[#8b849b] text-lg leading-relaxed max-w-sm">
                Always open to new ideas, collaborations, and interesting challenges.
              </p>
            </div>
            
            {/* Right Columns */}
            <div className="flex w-full lg:w-3/5 lg:justify-end">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 w-full lg:w-auto">
                <div>
                  <p className="text-[#8b849b] text-xs font-bold tracking-[0.2em] uppercase mb-8">Navigate</p>
                  <ul className="space-y-6 text-base font-medium text-white">
                    <li><a href="#" className="hover:text-[#7c3aed] transition-colors">Home</a></li>
                    <li><a href="#projects" className="hover:text-[#7c3aed] transition-colors">Projects</a></li>
                    <li><a href="#blogs" className="hover:text-[#7c3aed] transition-colors">Blogs</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[#8b849b] text-xs font-bold tracking-[0.2em] uppercase mb-8">Connect</p>
                  <ul className="space-y-6 text-base font-medium text-white">
                    <li><a href="https://github.com/shivzm" target="_blank" rel="noopener noreferrer" className="hover:text-[#7c3aed] transition-colors">GitHub</a></li>
                    <li><a href="https://linkedin.com/in/shivzm" target="_blank" rel="noopener noreferrer" className="hover:text-[#7c3aed] transition-colors">LinkedIn</a></li>
                    <li><a href="https://twitter.com/shivzm" target="_blank" rel="noopener noreferrer" className="hover:text-[#7c3aed] transition-colors">Twitter / X</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-[#8b849b] text-xs font-bold tracking-[0.2em] uppercase mb-8">Contact</p>
                  <ul className="space-y-6 text-base font-medium text-white">
                    <li><a href="mailto:shivam@example.com" className="hover:text-[#7c3aed] transition-colors">Email</a></li>
                    <li><a href="/resume.pdf" download="Shivam_Resume.pdf" className="hover:text-[#7c3aed] transition-colors">Resume</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Watermark & Copyright - Pulled up tightly using negative margin on desktop */}
        <div className="w-full relative flex flex-col items-center justify-end mt-8 md:-mt-4 overflow-hidden">
          <h1 className="font-serif font-bold text-[22vw] md:text-[25vw] leading-[0.75] text-center text-white/[0.03] select-none pointer-events-none z-0 tracking-tight">
            SHIVAM
          </h1>
          <div className="z-10 text-[#8b849b] text-sm font-medium text-center w-full mt-6 pb-6">
            © 2026 Shivam. All rights reserved.
          </div>
        </div>
      </motion.section>
    </div>
  );
}