import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Blobs float animation
      gsap.to('.blob-tl', { x: 20, y: -20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.blob-br', { x: -20, y: 20, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.blob-tr', { x: -15, y: 15, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.blob-bl', { x: 15, y: -10, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.blob-center', { scale: 1.1, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >

      {/* ── Layer 1: Foto blur ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Desktop */}
        <img
          src="/src/assets/prewed-hero.jpg"
          alt=""
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(1px)', transform: 'scale(1.08)' }}
        />
        {/* Mobile */}
        <img
          src="/src/assets/prewed-hero-mobile.jpg"
          alt=""
          className="block lg:hidden absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(1px)', transform: 'scale(1.08)' }}
        />
        {/* Overlay cream */}
        <div className="absolute inset-0 bg-cream/80" />
      </div>

      {/* ── Layer 2: Watercolor blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-tl absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.18]"
          style={{ background: 'radial-gradient(circle, #7D9B76 0%, #A8C5A0 40%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="blob-tr absolute -top-20 -right-24 w-[380px] h-[380px] rounded-full opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, #E2C97E 50%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="blob-br absolute -bottom-28 -right-20 w-[480px] h-[480px] rounded-full opacity-[0.20]"
          style={{ background: 'radial-gradient(circle, #5A7A52 0%, #7D9B76 45%, transparent 70%)', filter: 'blur(65px)' }} />
        <div className="blob-bl absolute -bottom-16 -left-28 w-[360px] h-[360px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #A07830 0%, #C9A84C 50%, transparent 70%)', filter: 'blur(75px)' }} />
        <div className="blob-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #A8C5A0 0%, transparent 65%)', filter: 'blur(80px)' }} />
      </div>

      {/* ── Layer 3: Ornamen — HANYA md ke atas ── */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* Garis kiri */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-24 bg-gold" />
          <div className="w-1 h-1 bg-gold rounded-full" />
          <div className="w-px h-24 bg-gold" />
        </div>
        {/* Garis kanan */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-24 bg-gold" />
          <div className="w-1 h-1 bg-gold rounded-full" />
          <div className="w-px h-24 bg-gold" />
        </div>
        {/* Sudut kiri atas */}
        <div className="absolute top-8 left-8 opacity-30">
          <div className="w-12 h-px bg-gold" />
          <div className="w-px h-12 bg-gold" />
        </div>
        {/* Sudut kanan atas */}
        <div className="absolute top-8 right-8 opacity-30 flex flex-col items-end">
          <div className="w-12 h-px bg-gold" />
          <div className="w-px h-12 bg-gold" />
        </div>
        {/* Sudut kiri bawah */}
        <div className="absolute bottom-20 left-8 opacity-30 flex flex-col justify-end">
          <div className="w-px h-12 bg-gold" />
          <div className="w-12 h-px bg-gold" />
        </div>
        {/* Sudut kanan bawah */}
        <div className="absolute bottom-20 right-8 opacity-30 flex flex-col items-end justify-end">
          <div className="w-px h-12 bg-gold" />
          <div className="w-12 h-px bg-gold" />
        </div>
      </div>

      {/* ── Konten ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">

        <p className="hero-bismillah font-cormorant text-sage-dark text-xl md:text-2xl italic opacity-0">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        <p className="hero-wedding-of font-cormorant text-gold tracking-[0.4em] text-xs uppercase opacity-0">
          The Wedding of
        </p>

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

        <div className="hero-date opacity-0 space-y-1">
          <p className="font-elle text-sage text-sm tracking-[0.3em] uppercase">
            Minggu, 19 April 2026
          </p>
          <p className="font-elle text-sage/60 text-xs tracking-widest">
            Pendopo Kinanthi, Semarang
          </p>
        </div>

        <div className="hero-divider flex items-center gap-4 origin-center">
          <div className="flex-1 h-px bg-gold/40" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="flex-1 h-px bg-gold/40" />
        </div>

        <div className="hero-ayat opacity-0 space-y-3 px-4">
          <p className="font-cormorant text-sage-dark/80 text-base md:text-lg italic leading-relaxed">
            "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">
            Q.S Ar-Rum: 21
          </p>
        </div>

      </div>

      {/* ── Scroll indicator — z-10 + pb ekstra biar ga ketimpa ── */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-2 opacity-40">
        <p className="font-elle text-sage text-xs tracking-widest uppercase">Scroll</p>
        <div className="w-px h-10 bg-sage animate-bounce" />
      </div>

    </section>
  )
}