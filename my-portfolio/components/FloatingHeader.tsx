"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-500 ${
        isScrolled 
          ? "top-6 bg-white/95 backdrop-blur-sm px-8 py-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-[#7b46ea]" 
          : "top-10 bg-transparent px-0 py-0 shadow-none text-[#7b46ea]"
      }`}
    >
      Shivam Mukherjee
    </motion.div>
  );
}