import SkillCard from "../components/SkillCard";
import { useRef } from "react";

const SkillsBlock = ({ label, title, skills }) => {
  return (
    <div className="w-full rounded-[2rem] glass p-6 sm:p-8 
    hover:scale-[1.01] transition-all duration-300">
      
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-theme-muted">
            {label}
          </p>

          <h2 className="text-2xl font-bold mt-2 text-theme">
            {title}
          </h2>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-surface text-theme-muted w-fit border border-theme">
          {label === "Frontend Stack" ? "Client" : "Server"}
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <SkillCard
            key={i}
            title={skill.title}
            subtitle={skill.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);

  const frontend = [
    { title: "HTML", subtitle: "Semantic structure" },
    { title: "CSS", subtitle: "Responsive & animations" },
    { title: "JavaScript", subtitle: "Core logic" },
    { title: "React", subtitle: "UI systems" },
    { title: "Three.js", subtitle: "3D rendering" },
    { title: "GSAP", subtitle: "Smooth motion" },
  ];

  const backend = [
    { title: "Node.js", subtitle: "Runtime & APIs" },
    { title: "Express", subtitle: "REST APIs" },
    { title: "MongoDB", subtitle: "NoSQL DB" },
    { title: "MySQL", subtitle: "Relational DB" },
    { title: "Firebase", subtitle: "Auth & realtime" },
    { title: "REST APIs", subtitle: "Scalable systems" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 py-20 flex flex-col gap-12 relative"
    >
      
      {/* 🔥 THEME-AWARE BACKGROUND GLOW */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-20"
        style={{ background: "var(--primary)" }}
      ></div>

      {/* FRONTEND */}
      <SkillsBlock
        label="Frontend Stack"
        title="Interactive UI & 3D"
        skills={frontend}
      />

      {/* BACKEND */}
      <SkillsBlock
        label="Backend Stack"
        title="Server & Data Layer"
        skills={backend}
      />

    </section>
  );
};

export default SkillsSection;