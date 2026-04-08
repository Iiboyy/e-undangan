import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Floral SVG Components ───────────────────────────────────────────────────

const FloralCorner = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.35">
      <path d="M10 110 Q40 70 80 20" stroke="#C9A646" strokeWidth="1" fill="none"/>
      <path d="M10 110 Q50 80 90 50" stroke="#C9A646" strokeWidth="0.8" fill="none"/>
      <path d="M30 85 Q20 65 40 60 Q45 75 30 85Z" fill="#5A7A52" opacity="0.6"/>
      <path d="M50 65 Q35 50 55 42 Q62 57 50 65Z" fill="#7D9B76" opacity="0.5"/>
      <path d="M65 45 Q55 28 72 25 Q76 40 65 45Z" fill="#5A7A52" opacity="0.6"/>
      <circle cx="80" cy="20" r="3" fill="#C9A646" opacity="0.7"/>
      <circle cx="80" cy="20" r="6" fill="none" stroke="#C9A646" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="55" cy="38" r="2.5" fill="#E2C97E" opacity="0.6"/>
      <circle cx="90" cy="50" r="2" fill="#C9A646" opacity="0.5"/>
      <ellipse cx="80" cy="14" rx="2" ry="4" fill="#C9A646" opacity="0.4" transform="rotate(-10 80 14)"/>
      <ellipse cx="86" cy="22" rx="2" ry="4" fill="#C9A646" opacity="0.4" transform="rotate(50 86 22)"/>
      <ellipse cx="83" cy="27" rx="2" ry="4" fill="#C9A646" opacity="0.4" transform="rotate(110 83 27)"/>
      <ellipse cx="74" cy="24" rx="2" ry="4" fill="#C9A646" opacity="0.4" transform="rotate(170 74 24)"/>
    </g>
  </svg>
)

const FloralSprig = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.3">
      <path d="M40 155 Q38 100 40 10" stroke="#C9A646" strokeWidth="1" fill="none"/>
      <path d="M40 120 Q20 110 18 95 Q32 98 40 120Z" fill="#7D9B76" opacity="0.7"/>
      <path d="M40 120 Q60 110 62 95 Q48 98 40 120Z" fill="#5A7A52" opacity="0.7"/>
      <path d="M40 85 Q22 75 20 60 Q34 63 40 85Z" fill="#7D9B76" opacity="0.6"/>
      <path d="M40 85 Q58 75 60 60 Q46 63 40 85Z" fill="#5A7A52" opacity="0.6"/>
      <path d="M40 52 Q25 42 24 30 Q36 33 40 52Z" fill="#7D9B76" opacity="0.5"/>
      <path d="M40 52 Q55 42 56 30 Q44 33 40 52Z" fill="#5A7A52" opacity="0.5"/>
      <circle cx="40" cy="10" r="5" fill="#C9A646" opacity="0.6"/>
      <ellipse cx="40" cy="3" rx="3" ry="5" fill="#E2C97E" opacity="0.5"/>
      <ellipse cx="47" cy="7" rx="3" ry="5" fill="#E2C97E" opacity="0.5" transform="rotate(60 47 7)"/>
      <ellipse cx="47" cy="14" rx="3" ry="5" fill="#E2C97E" opacity="0.5" transform="rotate(120 47 14)"/>
      <ellipse cx="40" cy="18" rx="3" ry="5" fill="#E2C97E" opacity="0.5" transform="rotate(180 40 18)"/>
      <ellipse cx="33" cy="14" rx="3" ry="5" fill="#E2C97E" opacity="0.5" transform="rotate(240 33 14)"/>
      <ellipse cx="33" cy="7" rx="3" ry="5" fill="#E2C97E" opacity="0.5" transform="rotate(300 33 7)"/>
    </g>
  </svg>
)

const FloralScatter = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.25">
      <circle cx="20" cy="20" r="4" fill="#C9A646"/>
      <circle cx="20" cy="20" r="8" fill="none" stroke="#C9A646" strokeWidth="0.8"/>
      <circle cx="75" cy="35" r="3" fill="#E2C97E"/>
      <circle cx="50" cy="70" r="5" fill="#C9A646"/>
      <circle cx="50" cy="70" r="9" fill="none" stroke="#C9A646" strokeWidth="0.8"/>
      <circle cx="85" cy="80" r="2.5" fill="#E2C97E"/>
      <path d="M30 50 Q35 40 45 45 Q40 55 30 50Z" fill="#7D9B76" opacity="0.6"/>
      <path d="M60 20 Q68 15 72 25 Q64 28 60 20Z" fill="#5A7A52" opacity="0.5"/>
      <path d="M10 75 Q15 65 25 70 Q20 78 10 75Z" fill="#7D9B76" opacity="0.5"/>
    </g>
  </svg>
)

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Couple() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Title entrance ───────────────────────────────────────────────────
      gsap.fromTo('.couple-title',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.couple-title', start: 'top 85%' }
        }
      )

      // ── Cards entrance ───────────────────────────────────────────────────
      gsap.fromTo('.bride-card',
        { opacity: 0, x: -48 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.bride-card', start: 'top 85%' }
        }
      )

      gsap.fromTo('.groom-card',
        { opacity: 0, x: 48 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.groom-card', start: 'top 85%' }
        }
      )

      // ── Corner florals — spring entrance, one-shot ────────────────────────
      // TL corner: tumbuh dari pojok kiri atas
      gsap.fromTo('.floral-tl',
        { opacity: 0, scale: 0.5, rotation: -20, transformOrigin: '0% 0%' },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 1.6,
          ease: 'elastic.out(1, 0.55)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // TR corner: mirror kanan atas
      gsap.fromTo('.floral-tr',
        { opacity: 0, scale: 0.5, rotation: 20, transformOrigin: '100% 0%' },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 1.6,
          ease: 'elastic.out(1, 0.55)',
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // BL corner: tumbuh dari pojok kiri bawah
      gsap.fromTo('.floral-bl',
        { opacity: 0, scale: 0.5, rotation: 18, transformOrigin: '0% 100%' },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 1.6,
          ease: 'elastic.out(1, 0.55)',
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // BR corner: mirror kanan bawah
      gsap.fromTo('.floral-br',
        { opacity: 0, scale: 0.5, rotation: -18, transformOrigin: '100% 100%' },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 1.6,
          ease: 'elastic.out(1, 0.55)',
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // ── Mid sprigs — slide in dari samping, one-shot ──────────────────────
      gsap.fromTo('.floral-mid-l',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo('.floral-mid-r',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // ── Scatter — fade naik, one-shot ─────────────────────────────────────
      gsap.fromTo('.floral-scatter-1, .floral-scatter-2',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // ── Parallax scroll — depth effect saat scroll ────────────────────────
      gsap.to('.floral-tl', {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      gsap.to('.floral-br', {
        y: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      gsap.to('.floral-tr', {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })

      gsap.to('.floral-bl', {
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })

    }, sectionRef)

    // ── Hover micro-interaction — hanya bergerak saat hover ─────────────────
    const floralEls = document.querySelectorAll(
      '.floral-tl, .floral-tr, .floral-bl, .floral-br'
    )

    const onEnter = (e) => gsap.to(e.currentTarget, {
      rotation: 6,
      scale: 1.08,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    })

    const onLeave = (e) => gsap.to(e.currentTarget, {
      rotation: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto'
    })

    floralEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      ctx.revert()
      floralEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-sage-dark py-24 px-6 overflow-hidden"
    >
      {/* Background blur decorasi */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* ── Floral decorations ────────────────────────────────────────────── */}

      {/* Corner TL */}
      <FloralCorner
        className="floral-tl absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 pointer-events-none"
        style={{ opacity: 0 }}
      />
      {/* Corner TR */}
      <FloralCorner
        className="floral-tr absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 pointer-events-none"
        style={{ opacity: 0, transform: 'scaleX(-1)' }}
      />
      {/* Corner BL */}
      <FloralCorner
        className="floral-bl absolute bottom-0 left-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none"
        style={{ opacity: 0, transform: 'scaleY(-1)' }}
      />
      {/* Corner BR */}
      <FloralCorner
        className="floral-br absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none"
        style={{ opacity: 0, transform: 'scale(-1, -1)' }}
      />
      {/* Mid left sprig */}
      <FloralSprig
        className="floral-mid-l absolute left-4 top-1/2 -translate-y-1/2 w-12 h-24 md:w-16 md:h-32 pointer-events-none hidden md:block"
        style={{ opacity: 0 }}
      />
      {/* Mid right sprig */}
      <FloralSprig
        className="floral-mid-r absolute right-4 top-1/2 -translate-y-1/2 w-12 h-24 md:w-16 md:h-32 pointer-events-none hidden md:block"
        style={{ opacity: 0, transform: 'translateY(-50%) scaleX(-1)' }}
      />
      {/* Scatter top center */}
      <FloralScatter
        className="floral-scatter-1 absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none"
        style={{ opacity: 0 }}
      />
      {/* Scatter bottom center */}
      <FloralScatter
        className="floral-scatter-2 absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-28 pointer-events-none"
        style={{ opacity: 0, transform: 'translateX(-50%) rotate(180deg)' }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Title */}
        <div className="couple-title text-center mb-16 space-y-3" style={{ opacity: 0 }}>
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">
            Yang Berbahagia
          </p>
          <h2 className="font-cormorant text-cream text-4xl md:text-5xl font-light italic">
            Mempelai
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* Bride */}
          <div className="bride-card text-center space-y-6" style={{ opacity: 0 }}>
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 border border-gold/40 rounded-full -rotate-6" />
              <div className="absolute inset-2 bg-sage/30 rounded-full overflow-hidden flex items-center justify-center">
                <span className="font-cormorant text-cream/40 text-6xl italic">C</span>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1">
                <p className="font-cormorant text-sage-dark text-xs tracking-[0.2em] uppercase whitespace-nowrap">
                  The Bride
                </p>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <h3 className="font-cormorant text-cream text-2xl md:text-3xl font-light leading-tight">
                Chelsea Rosari<br />
                <span className="italic">Mahakintha Samoling</span>
              </h3>
              <div className="w-8 h-px bg-gold/50 mx-auto" />
              <p className="font-elle text-cream/60 text-sm leading-relaxed">
                Putri dari<br />
                <span className="text-cream/80">Bapak Yakhin Susanto Samoling</span><br />
                &amp; <span className="text-cream/80">Ibu Bertha Dyah Maharsih</span>
              </p>
            </div>
          </div>

          {/* Groom */}
          <div className="groom-card text-center space-y-6" style={{ opacity: 0 }}>
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 border border-gold/40 rounded-full rotate-6" />
              <div className="absolute inset-2 bg-sage/30 rounded-full overflow-hidden flex items-center justify-center">
                <span className="font-cormorant text-cream/40 text-6xl italic">R</span>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1">
                <p className="font-cormorant text-sage-dark text-xs tracking-[0.2em] uppercase whitespace-nowrap">
                  The Groom
                </p>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <h3 className="font-cormorant text-cream text-2xl md:text-3xl font-light leading-tight">
                Ranu Barta<br />
                <span className="italic">Fahrizal</span>
              </h3>
              <div className="w-8 h-px bg-gold/50 mx-auto" />
              <p className="font-elle text-cream/60 text-sm leading-relaxed">
                Putra dari<br />
                <span className="text-cream/80">Bapak Subardo</span><br />
                &amp; <span className="text-cream/80">Ibu Sri Utami</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}