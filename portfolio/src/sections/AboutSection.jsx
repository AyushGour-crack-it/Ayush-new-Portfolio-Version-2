const StatCard = ({ title, subtitle }) => {
  return (
    <div className="rounded-2xl border border-theme bg-surface p-5 
    hover:bg-[var(--surface)]/80 transition">
      
      <p className="text-lg font-semibold text-theme">
        {title}
      </p>

      <p className="text-sm text-theme-muted mt-1">
        {subtitle}
      </p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full max-w-screen-xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      
      {/* LEFT CARD */}
      <div className="lg:col-span-4">
        <div className="glass rounded-[2rem] p-8 h-full">
          
          <p className="text-xs uppercase tracking-widest text-theme-muted">
            Who I Am
          </p>

          <h2 className="text-3xl font-bold mt-4 text-theme">
            About Me
          </h2>

          <div className="mt-8 flex items-center gap-2 text-theme-muted text-sm">
            <span>✨</span>
            <span>Design-driven frontend building</span>
          </div>

        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="lg:col-span-8">
        <div className="glass rounded-[2rem] p-8 sm:p-10 h-full">
          
          <p className="text-lg text-theme-muted leading-8 max-w-3xl">
            With expertise in React, Next.js, Three.js, and Web3 technologies, 
            I create full-stack applications that are not just functional but visually stunning. 
            I'm passionate about performance optimization, clean code architecture, 
            and pushing the boundaries of what's possible on the web.
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="3D Motion" subtitle="Interactive depth" />
            <StatCard title="Clean Code" subtitle="Fast and scalable" />
            <StatCard title="Visual Impact" subtitle="Memorable user journeys" />
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutSection;