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
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [bg, setBg] = useState("#000");
  const [accent, setAccent] = useState("#38bdf8");

  const containerRef = useRef(null);

  const slides = [
    media[media.length - 1],
    ...media,
    media[0],
  ];

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  /* 🔥 TINDER STYLE DRAG */
  const bind = useDrag(({ movement: [mx], down, direction: [xDir], velocity }) => {
    if (!down) {
      if (Math.abs(mx) > 60 || velocity > 0.25) {
        xDir > 0 ? prev() : next();
      }
    }
  });

  /* 🔁 LOOP FIX */
  useEffect(() => {
    const el = containerRef.current;

    const handleEnd = () => {
      if (index === slides.length - 1) {
        setIsAnimating(false);
        setIndex(1);
      }
      if (index === 0) {
        setIsAnimating(false);
        setIndex(slides.length - 2);
      }
    };

    el.addEventListener("transitionend", handleEnd);
    return () => el.removeEventListener("transitionend", handleEnd);
  }, [index]);

  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  /* 🎨 COLOR EXTRACTION */
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = slides[index];

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 50;
      canvas.height = 50;

      ctx.drawImage(img, 0, 0, 50, 50);

      const data = ctx.getImageData(0, 0, 50, 50).data;

      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);

      const color = `rgb(${r}, ${g}, ${b})`;
      setBg(color);
      setAccent(color);
    };
  }, [index]);

  return (
    <div className="w-full max-w-[520px] mx-auto relative">

      {/* 🔥 BLUR BACKGROUND */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 transition-all duration-500"
        style={{ background: bg }}
      />

      {/* 🔹 SLIDER */}
      <div className="relative overflow-hidden">

        {/* ARROWS */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass">
          <FiArrowLeft />
        </button>

        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass">
          <FiArrowRight />
        </button>

        {/* TRACK */}
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
          {slides.map((src, i) => {
            const isActive = i === index;

            return (
              <div key={i} className="min-w-full p-2 flex justify-center">

                {/* 🔥 ZOOM + PARALLAX */}
                <div
                  className="w-full max-w-[480px] aspect-[4/5] rounded-[2rem] overflow-hidden relative"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(0.9)",
                    transition: "transform 0.4s ease",
                    boxShadow: isActive
                      ? `0 20px 60px ${accent}55`
                      : "none",
                  }}
                >

                  {/* 🔥 ANIMATED BORDER */}
                  <div
                    className="absolute inset-0 rounded-[2rem] p-[2px]"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, transparent, ${accent})`,
                      animation: "spin 6s linear infinite",
                    }}
                  >
                    <div className="w-full h-full rounded-[2rem] overflow-hidden glass">
                      <img
                        src={src}
                        className="w-full h-full object-contain sm:object-cover"
                        alt=""
                      />
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 🔹 THUMBNAILS */}
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