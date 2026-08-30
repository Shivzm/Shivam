"use client";

import { ReactNode } from "react";

export default function SkillBadge({ children }: { children: ReactNode }) {
  return (
    <span className="px-3 py-1.5 text-sm text-neutral-300 bg-neutral-900/40 border border-neutral-800/60 rounded-full hover:bg-neutral-800/60 hover:text-white hover:border-neutral-700 transition-all duration-300 cursor-default">
      {children}
    </span>
  );
}