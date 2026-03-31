import { FiMail, FiArrowRight } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { FiArrowLeft} from "react-icons/fi";
/* ================= HERO DECK ================= */

const media = [
  "/ayush.jpg",
  "https://picsum.photos/600/800?random=1",
  "https://picsum.photos/600/800?random=2",
];

const to = (i) => ({
  x: 0,
  y: i * -18,
  scale: 1,
  rot: -6 + Math.random() * 12,
  delay: i * 80,
});

const from = () => ({
  x: 0,
  rot: 0,
  scale: 1.2,
  y: -150,
});

const trans = (r, s) =>
  `perspective(1200px) rotateX(12deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const HeroDeck = () => {
  const [index, setIndex] = useState(0);

  const [springs, api] = useSprings(media.length, (i) => ({
    x: 0,
    y: i * -25,
    scale: 1,
    rot: -6 + Math.random() * 12,
  }));

  // 👉 FIXED DRAG
  const bind = useDrag(({ down, movement: [mx], velocity, direction: [xDir] }) => {
    if (!down && Math.abs(mx) > 80) {
      if (xDir > 0) prev();
      else next();
      return;
    }

    api.start((i) => {
      if (i !== index) return;

      return {
        x: down ? mx : 0,
        rot: mx / 120,
        scale: down ? 1.05 : 1,
        immediate: down,
      };
    });
  });

  const next = () => {
    setIndex((i) => (i + 1) % media.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + media.length) % media.length);
  };

  useEffect(() => {
    api.start((i) => {
      const position = (i - index + media.length) % media.length;

      return {
        x: 0,
        y: position * -25,
        scale: 1 - position * 0.06,
        rot: position * -4,
        zIndex: media.length - position,
      };
    });
  }, [index]);

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">

      {/* 🔥 LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-0 z-50 p-3 rounded-full 
        glass border border-theme hover:scale-110 transition"
      >
        ←
      </button>

      {/* 🔥 RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-0 z-50 p-3 rounded-full 
        glass border border-theme hover:scale-110 transition"
      >
        →
      </button>

      {/* CARDS */}
      {springs.map(({ x, y, rot, scale, zIndex }, i) => (
        <animated.div
          key={i}
          {...bind()}
          style={{
            x,
            y,
            zIndex,
            transform: `perspective(1200px) rotateX(10deg) rotateY(${rot / 10}deg) rotateZ(${rot}deg) scale(${scale})`,
          }}
          className="absolute cursor-grab active:cursor-grabbing"
        >
          <div
            className="w-[480px] h-[480px] rounded-[2rem] overflow-hidden relative 
            glass border border-theme transition-all duration-300"
          >

            {/* 🔥 PREMIUM BORDER GLOW */}
            <div
              className="absolute inset-0 rounded-[2rem] opacity-0 hover:opacity-100 transition duration-500 blur-xl"
              style={{ background: "var(--primary)" }}
            />

            {/* IMAGE */}
            <img
              src={media[i]}
              className="w-full h-full object-cover relative z-10"
              alt="media"
            />
          </div>
        </animated.div>
      ))}
    </div>
  );
};

/* ================= HERO ================= */

const HeroSection = () => {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;

    audioRef.current = new Audio("/click.mp3");
    audioRef.current.volume = 0.12;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;

      const rotateX = (y / rect.height - 0.5) * 2.5;
      const rotateY = (x / rect.width - 0.5) * -2.5;

      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleLeave = () => {
      el.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* LEFT */}
      <div
        ref={heroRef}
        className="flex flex-col justify-center relative overflow-hidden transition-transform duration-200"
      >

        {/* CURSOR GLOW */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-72 h-72 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--primary)" }}
        />

        {/* STATUS */}
        <div className="mb-4 inline-flex items-center gap-3 w-fit rounded-full border border-theme bg-surface px-4 py-2 text-sm text-theme-muted backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Available for creative frontend work
        </div>

        <div className="mb-6 inline-flex items-center gap-3 w-fit rounded-full border border-theme bg-surface px-4 py-2 text-sm text-theme-muted backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
          Available for advanced backend work
        </div>

        {/* NAME */}
        <h1 className="text-5xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight flex flex-wrap">
          {"Ayush Gour".split("").map((char, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{ animationDelay: `${i * 0.04}s` }}
              onMouseEnter={playSound}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* TEXT */}
        <p className="mt-8 text-lg text-theme">
          Full Stack Developer • Web3 Enthusiast • Creative Technologist
        </p>

        <p className="mt-6 text-theme-muted max-w-xl">
          I build interactive, immersive web experiences using modern frontend technologies.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-5">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full 
          bg-[var(--primary)] text-black font-semibold 
          hover:gap-3 transition-all duration-200">
            View Work <FiArrowRight size={16} />
          </button>

          <button className="flex items-center gap-2 px-6 py-3 rounded-full 
          border border-theme text-theme 
          hover:gap-3 transition-all duration-200">
            Get in Touch <FiMail size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT → PREMIUM DECK */}
      <div className="flex items-center justify-center">
        <HeroDeck />
      </div>

    </section>
  );
};

export default HeroSection;