import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const ayatRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // animasi masuk pertama kali
      const tl = gsap.timeline()

      tl.fromTo('.hero-bismillah',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.hero-wedding-of',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.hero-names',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-date',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.hero-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-ayat',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Background dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Lingkaran sage blur kiri atas */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
        {/* Lingkaran gold blur kanan bawah */}
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        {/* Garis ornamen kiri */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-24 bg-gold" />
          <div className="w-1 h-1 bg-gold rounded-full" />
          <div className="w-px h-24 bg-gold" />
        </div>
        {/* Garis ornamen kanan */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-24 bg-gold" />
          <div className="w-1 h-1 bg-gold rounded-full" />
          <div className="w-px h-24 bg-gold" />
        </div>
      </div>

      {/* Konten */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">

        {/* Bismillah */}
        <p className="hero-bismillah font-cormorant text-sage-dark text-xl md:text-2xl italic opacity-0">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        {/* Wedding of */}
        <p className="hero-wedding-of font-cormorant text-gold tracking-[0.4em] text-xs uppercase opacity-0">
          The Wedding of
        </p>

        {/* Nama */}
        <div className="hero-names opacity-0">
          <h1 className="font-cormorant text-sage-dark text-6xl md:text-8xl font-light leading-none">
            Chelsea
          </h1>
          <p className="font-cormorant text-gold text-3xl md:text-4xl italic my-2">
            &
          </p>
          <h1 className="font-cormorant text-sage-dark text-6xl md:text-8xl font-light leading-none">
            Ranu
          </h1>
        </div>

        {/* Tanggal */}
        <div className="hero-date opacity-0 space-y-1">
          <p className="font-elle text-sage text-sm tracking-[0.3em] uppercase">
            Minggu, 19 April 2026
          </p>
          <p className="font-elle text-sage/60 text-xs tracking-widest">
            Pendopo Kinanthi, Semarang
          </p>
        </div>

        {/* Divider */}
        <div className="hero-divider flex items-center gap-4 origin-center">
          <div className="flex-1 h-px bg-gold/40" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="flex-1 h-px bg-gold/40" />
        </div>

        {/* Ayat */}
        <div className="hero-ayat opacity-0 space-y-3 px-4">
          <p className="font-cormorant text-sage-dark/80 text-base md:text-lg italic leading-relaxed">
            "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">
            Q.S Ar-Rum: 21
          </p>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <p className="font-elle text-sage text-xs tracking-widest uppercase">Scroll</p>
        <div className="w-px h-10 bg-sage animate-bounce" />
      </div>

    </section>
  )
}