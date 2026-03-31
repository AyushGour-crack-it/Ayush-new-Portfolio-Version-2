const SkillCard = ({ title, subtitle }) => {
  return (
    <div
      className="rounded-2xl border border-theme bg-surface p-4 
      hover:bg-[var(--surface)]/80 hover:scale-105 transition-all duration-300 
      cursor-pointer shadow-lg hover:shadow-[var(--primary)]/20 hover:border-[var(--primary)]/30"
    >
      <p className="text-lg font-semibold text-theme">
        {title}
      </p>

      <p className="text-sm text-theme-muted mt-1">
        {subtitle}
      </p>
    </div>
  );
};

export default SkillCard;