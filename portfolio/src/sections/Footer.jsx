import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 pb-10">

      {/* DIVIDER */}
      <div className="h-px w-full mb-10 bg-[var(--surface)]/50"></div>

      <div className="flex flex-col items-center gap-6">

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-6">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-theme-muted hover:text-[var(--primary)] 
            transition transform hover:scale-110 
            hover:drop-shadow-[0_0_10px_var(--primary)]"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-theme-muted hover:text-[var(--primary)] 
            transition transform hover:scale-110 
            hover:drop-shadow-[0_0_10px_var(--primary)]"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="text-theme-muted hover:text-[var(--primary)] 
            transition transform hover:scale-110 
            hover:drop-shadow-[0_0_10px_var(--primary)]"
          >
            <FaInstagram size={20} />
          </a>

        </div>

        {/* TEXT */}
        <p className="text-sm text-theme-muted text-center">
          © {new Date().getFullYear()} Ayush Gour — Built with intent.
        </p>

      </div>

    </footer>
  );
};

export default Footer;