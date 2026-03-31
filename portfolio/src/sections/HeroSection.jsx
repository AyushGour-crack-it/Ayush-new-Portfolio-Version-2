import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

/* ================= HERO DECK ================= */

const media = [
  "/ayush.jpg",
  "https://picsum.photos/600/800?random=1",
  "https://picsum.photos/600/800?random=2",
];

const HeroDeck = () => {
  const [index, setIndex] = useState(0);

  const [springs, api] = useSprings(media.length, (i) => ({
    x: 0,
    y: i * -30,
    scale: 1,
    rot: 0,
  }));

  const next = () => setIndex((i) => (i + 1) % media.length);
  const prev = () => setIndex((i) => (i - 1 + media.length) % media.length);

  /* 🔥 DRAG FIX (ONLY TOP CARD DRAGS) */
  const bind = useDrag(({ down, movement: [mx], direction: [xDir] }) => {
    if (!down && Math.abs(mx) > 80) {
      xDir > 0 ? prev() : next();
      return;
    }

    api.start((i) => {
      if (i !== index) return;

      return {
        x: down ? mx : 0,
        rot: mx / 150,
        scale: down ? 1.06 : 1,
        immediate: down,
      };
    });
  });

  useEffect(() => {
    api.start((i) => {
      const pos = (i - index + media.length) % media.length;

      return {
        x: 0,
        y: pos * -30,
        scale: 1 - pos * 0.05,
        rot: pos * -3,
        zIndex: media.length - pos,
        config: { tension: 500, friction: 40 },
      };
    });
  }, [index, api]);

  return (
    <animated.div className="relative w-[650px] h-[650px] flex items-center justify-center">

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-2 z-50 p-3 rounded-full glass border border-theme 
        hover:scale-110 transition group"
      >
        <FiArrowLeft className="group-hover:text-[var(--primary)]" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-2 z-50 p-3 rounded-full glass border border-theme 
        hover:scale-110 transition group"
      >
        <FiArrowRight className="group-hover:text-[var(--primary)]" />
      </button>

      {/* CARDS */}
      {springs.map(({ x, y, rot, scale, zIndex }, i) => (
        <animated.div
          key={i}
          {...(i === index ? bind() : {})} // ✅ only top card draggable
          style={{
            x,
            y,
            zIndex,
            transform: `perspective(1400px) rotateX(8deg) rotateY(${rot / 10}deg) rotateZ(${rot}deg) scale(${scale})`,
          }}
          className="absolute cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-[520px] h-[520px] rounded-[2rem] overflow-hidden">

            {/* 🔥 PREMIUM BORDER */}
            <div
              className="absolute inset-0 rounded-[2rem] p-[1.5px] 
              bg-gradient-to-br from-transparent via-[var(--primary)]/40 to-transparent 
              animate-border"
            >
              <div className="w-full h-full rounded-[2rem] glass border border-theme overflow-hidden">
                <img
                  src={media[i]}
                  className="w-full h-full object-cover"
                  alt="media"
                />
              </div>
            </div>

          </div>
        </animated.div>
      ))}

    </animated.div>
  );
};

/* ================= HERO SECTION ================= */

const HeroSection = () => {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;

    audioRef.current = new Audio("/click.mp3");
    audioRef.current.volume = 0.08;

    const move = (e) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowRef.current.style.transform = `translate(${x}px, ${y}px)`;

      const rx = (y / rect.height - 0.5) * 2;
      const ry = (x / rect.width - 0.5) * -2;

      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const leave = () => {
      el.style.transform = `rotateX(0) rotateY(0)`;
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const playSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* LEFT */}
      <div
        ref={heroRef}
        className="flex flex-col justify-center relative isolate transition-transform duration-200"
      >

        {/* 🔥 FIXED GLOW (NO SQUARE BUG) */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-80 h-80 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--primary)" }}
        />

        {/* NAME */}
        <h1 className="text-5xl lg:text-8xl font-extrabold flex flex-wrap">
          {"Ayush Gour".split("").map((c, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{ animationDelay: `${i * 0.04}s` }}
              onMouseEnter={playSound}
            >
              {c === " " ? "\u00A0" : c}
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
          bg-[var(--primary)] text-black font-semibold hover:gap-3 transition-all">
            View Work <FiArrowRight size={16} />
          </button>

          <button className="flex items-center gap-2 px-6 py-3 rounded-full 
          border border-theme text-theme hover:gap-3 transition-all">
            Get in Touch <FiMail size={16} />
          </button>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center">
        <HeroDeck />
      </div>

    </section>
  );
};

export default HeroSection;