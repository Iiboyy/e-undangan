import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import prewedHeroDesktop from "../assets/images/prewed-hero.jpg";
import prewedHeroMobile from "../assets/images/prewed-hero-mobile.jpg";

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
        <img
          src={prewedHeroDesktop}
          alt=""
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(3px)', transform: 'scale(1.08)' }}
        />
        <img
          src={prewedHeroMobile}
          alt=""
          className="block lg:hidden absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(3px)', transform: 'scale(1.08)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(245,240,230,0.5) 0%, rgba(245,240,230,0.3) 50%, rgba(245,240,230,0.6) 100%)' }}
        />
      </div>

      {/* ── Layer 2: Watercolor blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-tl absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.18]"
          style={{ background: 'radial-gradient(circle, #7D9B76 0%, #A8C5A0 40%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="blob-tr absolute -top-20 -right-24 w-[380px] h-[380px] rounded-full opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #C9A646 0%, #E2C97E 50%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="blob-br absolute -bottom-28 -right-20 w-[480px] h-[480px] rounded-full opacity-[0.20]"
          style={{ background: 'radial-gradient(circle, #5A7A52 0%, #7D9B76 45%, transparent 70%)', filter: 'blur(65px)' }} />
        <div className="blob-bl absolute -bottom-16 -left-28 w-[360px] h-[360px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #B8963E 0%, #C9A646 50%, transparent 70%)', filter: 'blur(75px)' }} />
        <div className="blob-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #A8C5A0 0%, transparent 65%)', filter: 'blur(80px)' }} />
      </div>

      {/* ── Layer 3: Ornamen ── */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-24 bg-[#C9A646]" />
          <div className="w-1 h-1 bg-[#C9A646] rounded-full" />
          <div className="w-px h-24 bg-[#C9A646]" />
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-24 bg-[#C9A646]" />
          <div className="w-1 h-1 bg-[#C9A646] rounded-full" />
          <div className="w-px h-24 bg-[#C9A646]" />
        </div>
      </div>

      {/* ── Konten ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8 backdrop-blur-[1px]">

        {/* Bismillah → cream */}
        <p
          className="hero-bismillah font-cormorant text-xl md:text-2xl italic opacity-0"
          style={{ color: '#C9A646', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        <p
          className="hero-wedding-of font-cormorant text-sm md:text-base tracking-[0.3em] uppercase opacity-0"
          style={{
            color: '#F5F0E8',
            textShadow: '0 1px 4px rgba(0,0,0,0.25)',
            letterSpacing: '0.25em'
          }}
        >
          The Wedding of
        </p>

        {/* Nama tetap sage-dark (besar, masih terbaca) */}
        <div className="hero-names opacity-0">
          <h1
            className="font-cormorant text-6xl md:text-8xl font-medium leading-none"
            style={{ color: '#3D5C36', textShadow: '0 0 30px rgba(61,92,54,0.8), 0 0 60px rgba(61,92,54,0.4)' }}
          >
            Chelsea
          </h1>
          <p className="font-cormorant text-3xl md:text-4xl italic my-2"
             style={{ color: '#C9A646' }}>
            &
          </p>
          <h1
            className="font-cormorant text-6xl md:text-8xl font-medium leading-none"
            style={{ color: '#3D5C36', textShadow: '0 0 30px rgba(61,92,54,0.8), 0 0 60px rgba(61,92,54,0.4)' }}
          >
            Ranu
          </h1>
        </div>

        {/* Tanggal & lokasi → cream */}
        <div className="hero-date opacity-0 space-y-1">
          <p
            className="font-elle text-sm tracking-[0.3em] uppercase"
            style={{ color: '#F5F0E8', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
          >
            Minggu, 19 April 2026
          </p>
          <p
            className="font-elle text-xs tracking-widest"
            style={{ color: 'rgba(245,240,232,0.75)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
          >
            Pendopo Kinanthi, Semarang
          </p>
        </div>

        <div className="hero-divider flex items-center gap-4 origin-center">
          <div className="flex-1 h-px bg-[#C9A646]/60" />
          <div className="w-1.5 h-1.5 bg-[#C9A646] rotate-45" />
          <div className="flex-1 h-px bg-[#C9A646]/60" />
        </div>

        {/* Ayat → cream */}
        <div className="hero-ayat opacity-0 space-y-3 px-4">
          <p
            className="font-cormorant text-base md:text-lg italic leading-relaxed"
            style={{ color: '#F5F0E8', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
          >
            "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <p
            className="font-elle text-sm tracking-[0.2em] font-medium"
            style={{
              color: '#C9A646',
              textShadow: '0 1px 3px rgba(0,0,0,0.25)'
            }}
          >
            Q.S Ar-Rum: 21
          </p>
        </div>

      </div>

      <div className="relative z-10 mt-12 flex flex-col items-center gap-2 opacity-50">
        <p className="font-elle text-sage text-xs tracking-widest uppercase">Scroll</p>
        <div className="w-px h-10 bg-sage animate-bounce" />
      </div>

    </section>
  )
}