import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.8) {
        setReveal(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:flex-row w-full min-h-screen"
    >
      {/* LEFT IMAGE */}
      <div className="relative w-full md:w-1/2 h-[60vh] md:h-auto overflow-hidden">
        
        {/* IMAGE */}
        <img
          src="/assets/contact-image.jpg" // replace with your image
          alt="contact"
          className="w-full h-full object-cover"
        />

        {/* CURTAIN OVERLAY */}
        <div
          className={`absolute inset-0 bg-white z-10 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.18,1)]
          ${reveal ? "translate-y-full" : "translate-y-0"}`}
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 bg-[#f5f5f5] flex items-center justify-center px-6 py-12 md:px-16">
        <div className="w-full max-w-lg space-y-8">

          {/* HEADING */}
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-serif leading-tight">
            DROP IN <br /> ANYTIME
          </h1>

          <p className="text-sm text-black/70 leading-relaxed">
            For tailored guidance or exclusive inquiries, contact our dedicated team.
          </p>

          {/* FORM */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Name & Surname"
              className="w-full border-b border-black/40 bg-transparent py-2 outline-none"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border-b border-black/40 bg-transparent py-2 outline-none"
            />

            <input
              type="email"
              placeholder="E-mail address"
              className="w-full border-b border-black/40 bg-transparent py-2 outline-none"
            />

            <textarea
              placeholder="Message"
              rows="3"
              className="w-full border-b border-black/40 bg-transparent py-2 outline-none resize-none"
            />

            <button className="mt-4 border px-6 py-2 hover:bg-black hover:text-white transition">
              Submit
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;