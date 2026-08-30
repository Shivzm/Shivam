import { 
  SiPython, SiTypescript, SiJavascript, SiReact, 
  SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiPostgresql, 
  SiMongodb, SiSqlite, SiSupabase, SiFirebase, SiCloudflare, 
  SiDocker, SiKubernetes, SiTerraform, SiVercel, SiGit, SiGitlab, SiNpm, SiUv
} from "react-icons/si";
import { FaJava, FaDatabase, FaGears, FaServer, FaBrain, FaRobot, FaLink, FaNetworkWired, FaWrench } from "react-icons/fa6";

export const skillCategories = [
  {
    title: "AI & Machine Learning",
    count: 7,
    skills: [
      { name: "LangChain", icon: FaLink, color: "#12B981" },
      { name: "LangGraph", icon: FaNetworkWired, color: "#F97316" },
      { name: "LangSmith & Evals", icon: FaWrench, color: "#EAB308" },
      { name: "RAG Architecture", icon: FaBrain, color: "#B042FF" },
      { name: "VectorDBs", icon: FaDatabase, color: "#06B6D4" },
      { name: "Agentic Workflows", icon: FaRobot, color: "#7B46EA" },
      { name: "Prompt Engineering", icon: FaServer, color: "#A855F7" },
    ]
  },
  {
    title: "Programming Languages",
    count: 6,
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "SQL", icon: FaDatabase, color: "#4479A1" },
      { name: "x86 Assembly", icon: FaGears, color: "#6E7681" },
    ]
  },
  {
    title: "Frontend",
    count: 3,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    ]
  },
  {
    title: "Backend Frameworks",
    count: 3,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF" },
      { name: "FastAPI", icon: FaServer, color: "#009688" },
    ]
  },
  {
    title: "Databases & Data Layer",
    count: 5,
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ]
  },
  {
    title: "Cloud, DevOps & Infrastructure",
    count: 5,
    skills: [
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    ]
  },
  {
    title: "Tooling & Build Systems",
    count: 4,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
      { name: "uv", icon: SiUv, color: "#B042FF" },
      { name: "npm", icon: SiNpm, color: "#CB3837" }
    ]
  }
];