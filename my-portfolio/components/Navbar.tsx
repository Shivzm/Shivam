"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiFileText, FiMail } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="max-w-2xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between text-sm text-neutral-400">
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-white font-medium hover:text-neutral-300 transition-colors">Home</Link>
        <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
        <Link href="#blogs" className="hover:text-white transition-colors">Blogs</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiGithub size={18} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiLinkedin size={18} /></a>
        <a href="mailto:your-email@example.com" className="hover:text-white transition-colors"><FiMail size={18} /></a>
      </div>
    </header>
  );
}