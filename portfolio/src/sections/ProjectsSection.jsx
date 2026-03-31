import { useState, useRef } from "react";
import { 
  FiArrowRight, 
  FiExternalLink 
} from "react-icons/fi";
const ProjectCard = ({ project, onClick }) => {
  return (
    <div onClick={onClick} className="group perspective cursor-pointer">

      <div className="relative rounded-[2rem] overflow-hidden min-h-[340px]">

        {/* IMAGE */}
        <img
          src="https://plus.unsplash.com/premium_photo-1747851576159-8d483776648d?w=600&auto=format&fit=crop&q=60"
          alt="project"
          className="absolute inset-0 w-full h-full object-cover 
          transition-transform duration-700 group-hover:scale-110"
        />

        {/* THEME GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b 
        from-black/10 via-black/40 to-black/90" />

        {/* THEME GLOW */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-40 
          transition duration-500 blur-3xl"
          style={{ background: "var(--primary)" }}
        ></div>

        {/* CONTENT */}
        <div className="relative z-10 p-6 flex flex-col justify-end h-full">

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-3">
            {["React", "Node", "MongoDB"].map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full 
                bg-surface text-theme backdrop-blur-md border border-theme"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* TITLE */}
          <h3 className="text-2xl font-bold text-theme">
            {project.title}
          </h3>

          {/* DESC */}
          <p className="text-theme-muted text-sm mt-2 line-clamp-2">
            {project.desc}
          </p>

          {/* HOVER TEXT */}
          <div
            className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition"
            style={{ color: "var(--primary)" }}
          >
            View Project →
          </div>

        </div>

      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* MODAL */}
      <div className="relative w-[92%] max-w-5xl rounded-[2rem] overflow-hidden glass animate-fadeIn">

        {/* IMAGE */}
        <div className="relative h-[280px]">
          <img
            src="https://picsum.photos/1000/600?random=2"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 px-3 py-1 rounded-full 
            bg-surface text-theme backdrop-blur-md border border-theme"
          >
            ✕
          </button>

          {/* TITLE */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-theme">
              {project.title}
            </h2>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["React", "Node", "MongoDB", "GSAP"].map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full 
                bg-surface text-theme border border-theme"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* DESC */}
          <p className="text-theme-muted leading-7 max-w-3xl">
            {project.desc} Real project explanation goes here.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">

            <button
              className="px-6 py-3 rounded-full font-semibold text-black 
              bg-[var(--primary)] hover:scale-105 transition flex items-center gap-2"
            >
              Live Demo <FiExternalLink size={16} />
            </button>

            <button
              className="px-6 py-3 rounded-full border border-theme text-theme 
              hover:bg-surface transition"
            >
              GitHub
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
const ProjectsSection = () => {
  const scrollRef = useRef();
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      title: "Watch Tracker App",
      desc: "Track movies and shows with a personalized system.",
    },
    {
      title: "3D Portfolio",
      desc: "Interactive portfolio with Three.js and animations.",
    },
    {
      title: "Future Project",
      desc: "Upcoming full-stack innovation project.",
    },
    {
      title: "Another Project",
      desc: "Extra project for scroll behavior.",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-theme-muted">
            3D Gallery
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-theme">
            Featured Projects
          </h2>
        </div>

        <p className="hidden md:block text-theme-muted text-sm">
          Interactive experiences
        </p>
      </div>

      {/* SCROLL */}
      <div className="relative">

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {projects.map((p, i) => (
            <div key={i} className="min-w-[85%] sm:min-w-[48%] lg:min-w-[32%]">
              <ProjectCard
                project={p}
                onClick={() => setActiveProject(p)}
              />
            </div>
          ))}
        </div>

        {/* ARROW */}
        <button
          onClick={() =>
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })
          }
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 
          bg-surface backdrop-blur-md p-3 rounded-full 
          hover:scale-110 transition border border-theme"
        >
          <FiArrowRight size={18} />
        </button>

      </div>

      {/* MOBILE CTA */}
      <div className="mt-10 flex justify-center lg:hidden">
        <button
          className="px-6 py-3 rounded-full border border-theme 
          bg-surface text-theme hover:bg-[var(--primary)] hover:text-black transition"
        >
          View More Projects →
        </button>
      </div>

      {/* MODAL */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

    </section>
  );
};

export default ProjectsSection;