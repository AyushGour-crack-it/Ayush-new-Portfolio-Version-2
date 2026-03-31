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
  const [index, setIndex] = useState(1); // start from 1 (because of clones)
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef(null);

  // 🔥 CLONE FIRST + LAST (for infinite effect)
  const slides = [
    media[media.length - 1],
    ...media,
    media[0],
  ];

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  /* 🔥 SWIPE */
  const bind = useDrag(({ movement: [mx], down, direction: [xDir], velocity }) => {
    if (!down) {
      if (Math.abs(mx) > 60 || velocity > 0.3) {
        xDir > 0 ? prev() : next();
      }
    }
  });

  /* 🔥 HANDLE LOOP RESET (NO JUMP VISIBLE) */
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (index === slides.length - 1) {
        setIsAnimating(false);
        setIndex(1);
      }
      if (index === 0) {
        setIsAnimating(false);
        setIndex(slides.length - 2);
      }
    };

    const el = containerRef.current;
    el.addEventListener("transitionend", handleTransitionEnd);

    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [index]);

  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  return (
    <div className="w-full max-w-[520px] mx-auto">

      {/* 🔹 MAIN SLIDER */}
      <div className="relative overflow-hidden">

        {/* ARROWS */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border border-theme"
        >
          <FiArrowLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border border-theme"
        >
          <FiArrowRight />
        </button>

        {/* SLIDER TRACK */}
        <div
          {...bind()}
          ref={containerRef}
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: isAnimating
              ? "transform 0.5s cubic-bezier(0.22,1,0.36,1)"
              : "none",
          }}
        >
          {slides.map((src, i) => (
            <div key={i} className="min-w-full p-2 flex justify-center">
              
              {/* 🔥 FIXED IMAGE RESPONSIVENESS */}
              <div className="w-full max-w-[480px] aspect-[4/5] rounded-[2rem] overflow-hidden glass border border-theme">
                <img
                  src={src}
                  className="w-full h-full object-contain sm:object-cover"
                  alt="media"
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 🔹 THUMBNAILS (ONLY MOBILE) */}
      <div className="flex gap-2 mt-4 overflow-x-auto sm:hidden px-2">
        {media.map((src, i) => (
          <img
            key={i}
            src={src}
            onClick={() => setIndex(i + 1)}
            className={`w-16 h-16 rounded-lg object-cover cursor-pointer border ${
              index === i + 1 ? "border-white" : "border-white/20"
            }`}
          />
        ))}
      </div>

    </div>
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