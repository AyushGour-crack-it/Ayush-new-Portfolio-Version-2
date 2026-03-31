import { useState } from "react";
import { FiSend, FiMail } from "react-icons/fi";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return showToast("Please fill all fields", "error");
    }

    if (!form.email.includes("@")) {
      return showToast("Enter valid email", "error");
    }

    showToast("Message sent successfully 🚀");

    setForm({ name: "", email: "", message: "", rating: 0 });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">

      <div className="glass rounded-[2rem] p-8 sm:p-12 relative overflow-hidden">

        {/* 🔥 THEME GLOW */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 blur-3xl pointer-events-none opacity-20"
          style={{ background: "var(--primary)" }}
        ></div>

        {/* HEADER */}
        <p className="text-xs uppercase tracking-widest text-theme-muted">
          Get In Touch
        </p>

        <h2 className="text-4xl lg:text-5xl font-bold mt-4 text-theme">
          Let’s Create Something Amazing
        </h2>

        <p className="text-theme-muted mt-6 max-w-2xl">
          Open to collaborations, projects, and ideas. Let’s build something meaningful.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* NAME */}
            <div className="flex flex-col gap-2 group">
              <label className="text-sm text-theme-muted">Your Name</label>

              <div className="relative">
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-theme py-2 outline-none 
                  text-theme focus:border-[var(--primary)] transition"
                />

                <span
                  className="absolute left-0 bottom-0 h-[2px] w-0 
                  transition-all duration-300 group-focus-within:w-full"
                  style={{ background: "var(--primary)" }}
                ></span>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2 group">
              <label className="text-sm text-theme-muted">Your Email</label>

              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-theme py-2 outline-none 
                  text-theme focus:border-[var(--primary)] transition"
                />

                <span
                  className="absolute left-0 bottom-0 h-[2px] w-0 
                  transition-all duration-300 group-focus-within:w-full"
                  style={{ background: "var(--primary)" }}
                ></span>
              </div>
            </div>

          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-2 group mt-10">
            <label className="text-sm text-theme-muted">Message</label>

            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full h-32 bg-transparent border-b border-theme py-2 outline-none 
                text-theme resize-none focus:border-[var(--primary)] transition"
              />

              <span
                className="absolute left-0 bottom-0 h-[2px] w-0 
                transition-all duration-300 group-focus-within:w-full"
                style={{ background: "var(--primary)" }}
              ></span>
            </div>
          </div>

          {/* ⭐ STAR RATING */}
          <div className="mt-10">
            <p className="text-sm text-theme-muted mb-2">Rate this portfolio</p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  className={`text-2xl cursor-pointer transition ${
                    star <= form.rating
                      ? "scale-110"
                      : "text-theme-muted hover:text-[var(--primary)]"
                  }`}
                  style={{
                    color:
                      star <= form.rating ? "var(--primary)" : undefined,
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black 
              bg-[var(--primary)] hover:scale-105 transition"
            >
              Send Message <FiSend size={16} />
            </button>

            <a
              href="mailto:your@email.com"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full 
              border border-theme text-theme hover:bg-surface transition"
            >
              Email Direct <FiMail size={16} />
            </a>

          </div>

        </form>

      </div>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl backdrop-blur-md 
          shadow-lg animate-fadeIn`}
          style={{
            background:
              toast.type === "error"
                ? "rgba(255,0,0,0.15)"
                : "rgba(0,255,100,0.15)",
          }}
        >
          {toast.msg}
        </div>
      )}

    </section>
  );
};

export default ContactSection;