import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterImg from "../assets/images/footer.jpg";

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM_BRIDE = "https://instagram.com/username_chelsea";
const INSTAGRAM_GROOM = "https://instagram.com/username_ranu";

export default function Footer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-content",
            start: "top 85%",
          },
        },
      );
      gsap.fromTo(
        ".footer-photo",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-photo",
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-sage-dark overflow-hidden py-24 px-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #A8C5A0 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center text-center gap-10">
        <div className="footer-content opacity-0 space-y-5">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">
            With Love
          </p>

          <h2 className="font-cormorant text-cream text-4xl md:text-5xl font-light italic leading-snug">
            Terima Kasih
          </h2>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/40" />
          </div>

          <p className="font-cormorant text-cream/80 text-lg md:text-xl italic leading-relaxed">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
            kami.
          </p>

          <div className="pt-2 space-y-1">
            <p className="font-elle text-cream/50 text-xs tracking-[0.3em] uppercase">
              Mempelai
            </p>
            <p className="font-cormorant text-gold text-2xl md:text-3xl italic">
              Chelsea & Ranu
            </p>
          </div>

          <p className="font-elle text-cream/40 text-sm tracking-widest">
            #ChelseaAndRanu
          </p>
        </div>

        <div className="footer-photo opacity-0 w-full max-w-xs">
          <div className="relative">
            <div className="absolute -inset-2 border border-gold/20 rounded-sm" />
            <div className="absolute -inset-4 border border-gold/10 rounded-sm" />
            <img
              src={FooterImg}
              alt="Chelsea & Ranu"
              className="relative w-full aspect-[3/4] object-cover rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sage-dark/60 to-transparent rounded-b-sm" />
          </div>
        </div>

        <div className="footer-content opacity-0 flex flex-col items-center gap-4">
          <p className="font-elle text-cream/40 text-xs tracking-[0.3em] uppercase">
            Follow Our Journey
          </p>
          <div className="flex items-center gap-6">
            <a
              href={INSTAGRAM_BRIDE}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#C9A84C" />
                </svg>
              </div>
              <p className="font-cormorant text-cream/50 text-xs italic group-hover:text-gold transition-colors duration-300">
                The Bride
              </p>
            </a>

            <div className="w-1.5 h-1.5 bg-gold/30 rotate-45" />
            <a
              href={INSTAGRAM_GROOM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#C9A84C" />
                </svg>
              </div>
              <p className="font-cormorant text-cream/50 text-xs italic group-hover:text-gold transition-colors duration-300">
                The Groom
              </p>
            </a>
          </div>
        </div>

        <div className="footer-content opacity-0 flex flex-col items-center gap-3 pt-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gold/20" />
            <div className="w-1 h-1 bg-gold/40 rotate-45" />
            <div className="w-16 h-px bg-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
