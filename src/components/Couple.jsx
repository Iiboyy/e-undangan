import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Couple() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.couple-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: '.couple-title',
            start: 'top 85%',
          }
        }
      )

      gsap.fromTo('.bride-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.bride-card',
            start: 'top 85%',
          }
        }
      )

      gsap.fromTo('.groom-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.groom-card',
            start: 'top 85%',
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-sage-dark py-24 px-6 overflow-hidden"
    >
      {/* Background dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Title */}
        <div className="couple-title text-center mb-16 space-y-3 opacity-0">
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
          <div className="bride-card opacity-0 text-center space-y-6">
            {/* Foto placeholder */}
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 border border-gold/40 rounded-full -rotate-6" />
              <div className="absolute inset-2 bg-sage/30 rounded-full overflow-hidden flex items-center justify-center">
                <span className="font-cormorant text-cream/40 text-6xl italic">C</span>
              </div>
              {/* Label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1">
                <p className="font-cormorant text-sage-dark text-xs tracking-[0.2em] uppercase whitespace-nowrap">
                  The Bride
                </p>
              </div>
            </div>

            {/* Info */}
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
          <div className="groom-card opacity-0 text-center space-y-6">
            {/* Foto placeholder */}
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 border border-gold/40 rounded-full rotate-6" />
              <div className="absolute inset-2 bg-sage/30 rounded-full overflow-hidden flex items-center justify-center">
                <span className="font-cormorant text-cream/40 text-6xl italic">R</span>
              </div>
              {/* Label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1">
                <p className="font-cormorant text-sage-dark text-xs tracking-[0.2em] uppercase whitespace-nowrap">
                  The Groom
                </p>
              </div>
            </div>

            {/* Info */}
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