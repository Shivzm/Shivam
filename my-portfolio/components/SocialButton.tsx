"use client";

interface SocialButtonProps {
  icon: React.ElementType;
  label: string;
  color: string;
  href?: string;
}

export default function SocialButton({ icon: Icon, label, color, href = "#" }: SocialButtonProps) {
  return (
    <a href={href} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#d9cffd] rounded-xl text-sm font-semibold text-[#171026] hover:shadow-md transition-shadow">
      <Icon style={{ color }} className="text-lg" /> {label}
    </a>
  );
}