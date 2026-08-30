"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface SkillAccordionProps {
  category: { title: string; count: number; skills: Skill[] };
  index: number;
  openSkill: number | null;
  toggleSkill: (index: number) => void;
  itemVariants: Variants;
}

export default function SkillAccordion({ category, index, openSkill, toggleSkill, itemVariants }: SkillAccordionProps) {
  const isOpen = openSkill === index;

  return (
    <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => toggleSkill(index)} className="w-full flex justify-between items-center p-6 hover:bg-white/5 transition-colors">
        <h3 className="text-white/80 text-[13px] font-bold tracking-[0.15em] uppercase">{category.title}</h3>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm font-medium">{category.count}</span>
          <FiChevronDown className={`text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span key={skill.name} className="flex items-center gap-2 bg-[#171026] border border-white/5 px-4 py-2 rounded-xl text-[13px] font-medium text-white/90 hover:bg-white/10 transition-colors">
                  <skill.icon style={{ color: skill.color }} className="text-base" /> {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}