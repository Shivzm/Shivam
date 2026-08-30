"use client";

import { FiArrowUpRight } from "react-icons/fi";

interface ProjectProps {
  title: string;
  description: string;
  link: string;
  stack: string[];
}

export default function ProjectCard({ title, description, link, stack }: ProjectProps) {
  return (
    <a href={link} className="block group p-5 -mx-5 rounded-xl hover:bg-neutral-900/40 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-neutral-200 group-hover:text-white flex items-center gap-2 transition-colors">
          {title}
          <span className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-neutral-400 flex items-center">
            <FiArrowUpRight size={18} />
          </span>
        </h3>
      </div>
      <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span key={tech} className="text-xs text-neutral-500 bg-neutral-950 border border-neutral-800/50 px-2 py-1 rounded-md">
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}