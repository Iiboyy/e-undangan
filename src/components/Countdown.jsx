import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Target: Resepsi — Minggu, 19 April 2026 pukul 12.00 WIB
const TARGET_DATE = new Date('2026-04-19T12:00:00+07:00')

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const diff = TARGET_DATE - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function CountBox({ value, label, flip }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative flex items-center justify-center rounded-sm overflow-hidden
          bg-cream border border-gold/30
          ${flip ? 'count-flip' : ''}
          w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24`}
        style={{
          boxShadow: '0 2px 16px 0 rgba(180,155,100,0.10), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Top half shine */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 pointer-events-none" />
        {/* Separator line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gold/20 pointer-events-none" />
        <span className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-sage-dark select-none">
          {pad(value)}
        </span>
      </div>
      <p className="font-elle text-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase">{label}</p>
    </div>
  )
}

// Corner ornament
function CornerOrnament({ position = 'tl', size = 52 }) {
  const isTop = position.startsWith('t')
  const isLeft = position.endsWith('l')
  const scaleX = isLeft ? 1 : -1
  const scaleY = isTop ? 1 : -1

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${scaleX}, ${scaleY})`, transformOrigin: 'center' }}
    >
      <line x1="8" y1="44" x2="8" y2="8" stroke="#C9A646" strokeWidth="0.9" opacity="0.85"/>
      <line x1="8" y1="8" x2="44" y2="8" stroke="#C9A646" strokeWidth="0.9" opacity="0.85"/>
      <line x1="22" y1="8" x2="22" y2="13" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="36" y1="8" x2="36" y2="16" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="8" y1="22" x2="13" y2="22" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="8" y1="36" x2="16" y2="36" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="13" y1="44" x2="13" y2="13" stroke="#C9A646" strokeWidth="0.7" opacity="0.55"/>
      <line x1="13" y1="13" x2="44" y2="13" stroke="#C9A646" strokeWidth="0.7" opacity="0.55"/>
      <line x1="18" y1="38" x2="18" y2="18" stroke="#C9A646" strokeWidth="0.45" opacity="0.3"/>
      <line x1="18" y1="18" x2="38" y2="18" stroke="#C9A646" strokeWidth="0.45" opacity="0.3"/>
      <circle cx="8" cy="8" r="1.8" fill="#C9A646" opacity="0.9"/>
    </svg>
  )
}

// ── Save the Date → Google Calendar URL ──────────────────────────────────────
function openGoogleCalendar() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Resepsi Pernikahan Chelsea & Ranu',
    // 11:00 WIB = 04:00 UTC | 14:00 WIB = 07:00 UTC
    dates: '20260419T040000Z/20260419T070000Z',
    details: 'Resepsi Pernikahan Chelsea Rosari Mahakintha Samoling & Ranu Barta Fahrizal. Pukul 11.00 – 14.00 WIB.',
    location: 'Pendopo Kinanthi, Perumahan Wonolopo Asri, Wonolopo, Kec. Mijen, Kota Semarang, Jawa Tengah 50215',
  })
  window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank')
}

export default function Countdown() {
  const sectionRef = useRef(null)
  const [time, setTime] = useState(getTimeLeft())
  const [flipped, setFlipped] = useState({ days: false, hours: false, minutes: false, seconds: false })


  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeLeft()
      setFlipped({
        days: newTime.days !== time.days,
        hours: newTime.hours !== time.hours,
        minutes: newTime.minutes !== time.minutes,
        seconds: newTime.seconds !== time.seconds,
      })
      setTime(newTime)
      setTimeout(() => {
        setFlipped({ days: false, hours: false, minutes: false, seconds: false })
      }, 450)
    }, 1000)
    return () => clearInterval(interval)
  }, [time.days, time.hours, time.minutes, time.seconds])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Title entrance
      gsap.fromTo('.countdown-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.countdown-title', start: 'top 85%' }
        }
      )

      // Corner ornaments — spring entrance
      gsap.fromTo('.corner-ornament',
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1, scale: 1,
          duration: 1.4,
          ease: 'elastic.out(1, 0.6)',
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      )

      // Countdown boxes entrance
      gsap.fromTo('.countdown-box',
        { opacity: 0, y: 40, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.countdown-wrapper', start: 'top 80%' }
        }
      )

      // Quote ayat entrance
      gsap.fromTo('.ayat-block',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.ayat-block', start: 'top 88%' }
        }
      )

      // Save the date button
      gsap.fromTo('.save-date-btn',
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'back.out(1.7)', delay: 0.1,
          scrollTrigger: { trigger: '.save-date-btn', start: 'top 90%' }
        }
      )

      // Closing quote
      gsap.fromTo('.countdown-info',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, delay: 0.3,
          scrollTrigger: { trigger: '.countdown-info', start: 'top 90%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const isDone = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0

  const handleSave = () => {
    openGoogleCalendar()
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 px-6 overflow-hidden"
    >
      {/* Background dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #8B7355 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Corner Ornaments */}
      {['tl', 'tr', 'bl', 'br'].map(pos => (
        <div
          key={pos}
          className={`corner-ornament absolute pointer-events-none
            ${pos.startsWith('t') ? 'top-0' : 'bottom-0'}
            ${pos.endsWith('l') ? 'left-0' : 'right-0'}
          `}
          style={{ opacity: 0 }}
        >
          <CornerOrnament position={pos} size={52} />
        </div>
      ))}

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Title */}
        <div className="countdown-title text-center mb-14 space-y-3" style={{ opacity: 0 }}>
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">
            The Big Day
          </p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">
            Hitung Mundur
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">
            Menuju Hari Bahagia Chelsea &amp; Ranu
          </p>
        </div>

        {/* Countdown boxes */}
        <div className="countdown-wrapper flex justify-center">
          {isDone ? (
            <div className="text-center space-y-3 py-8">
              <p className="font-cormorant text-sage-dark text-3xl italic">
                Hari yang ditunggu telah tiba!
              </p>
              <p className="font-elle text-gold text-sm tracking-widest">
                Semoga menjadi berkah bagi keduanya.
              </p>
            </div>
          ) : (
            <div className="flex items-start justify-center gap-2 sm:gap-4 md:gap-8 w-full">
              <div className="countdown-box" style={{ opacity: 0 }}>
                <CountBox value={time.days} label="Hari" flip={flipped.days} />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 mt-5 sm:mt-6 md:mt-8">
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
              </div>
              <div className="countdown-box" style={{ opacity: 0 }}>
                <CountBox value={time.hours} label="Jam" flip={flipped.hours} />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 mt-5 sm:mt-6 md:mt-8">
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
              </div>
              <div className="countdown-box" style={{ opacity: 0 }}>
                <CountBox value={time.minutes} label="Menit" flip={flipped.minutes} />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 mt-5 sm:mt-6 md:mt-8">
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
              </div>
              <div className="countdown-box" style={{ opacity: 0 }}>
                <CountBox value={time.seconds} label="Detik" flip={flipped.seconds} />
              </div>
            </div>
          )}
        </div>

        {/* ── Ayat / Quote ───────────────────────────────────────────────── */}
        <div className="ayat-block text-center mt-16 px-4 md:px-12" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>

          {/* Ornamen arabesque kecil */}
          <div className="flex justify-center mb-5">
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 9 Q15 0 30 9 Q45 18 60 9" stroke="#C9A646" strokeWidth="0.8" fill="none" opacity="0.5"/>
              <circle cx="30" cy="9" r="2" fill="#C9A646" opacity="0.6"/>
              <circle cx="10" cy="6" r="1" fill="#C9A646" opacity="0.3"/>
              <circle cx="50" cy="12" r="1" fill="#C9A646" opacity="0.3"/>
            </svg>
          </div>

          <p className="font-cormorant text-sage-dark/40 text-sm tracking-[0.3em] uppercase mb-4">
            Cinta Tidak Pernah Sendiri
          </p>

          <blockquote className="font-cormorant text-sage-dark text-xl md:text-2xl font-light italic leading-relaxed mb-4">
            "Sejauh apa pun melangkah, hati tahu ke mana ia harus pulang. Di antara doa-doa sederhana, kami menemukan jawaban yang sama. Kami menanti kehadiran Anda untuk menjadi saksi janji suci kami."
          </blockquote>

          <div className="flex justify-center mt-5">
            <svg width="60" height="18" viewBox="0 0 60 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 9 Q15 18 30 9 Q45 0 60 9" stroke="#C9A646" strokeWidth="0.8" fill="none" opacity="0.5"/>
              <circle cx="30" cy="9" r="2" fill="#C9A646" opacity="0.6"/>
              <circle cx="10" cy="12" r="1" fill="#C9A646" opacity="0.3"/>
              <circle cx="50" cy="6" r="1" fill="#C9A646" opacity="0.3"/>
            </svg>
          </div>
        </div>

        {/* ── Save the Date button ───────────────────────────────────────── */}
        <div className="flex flex-col items-center mt-12 gap-3">
          <button
            className="save-date-btn group relative overflow-hidden"
            style={{
              opacity: 0,
              border: '1px solid rgba(201,166,70,0.5)',
              background: 'transparent',
              padding: '12px 36px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={handleSave}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,166,70,0.08)'
              e.currentTarget.style.borderColor = 'rgba(201,166,70,0.9)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(201,166,70,0.5)'
            }}
          >
            {/* Inner corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="11" x2="1" y2="1" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
                <line x1="1" y1="1" x2="11" y2="1" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
              </svg>
            </span>
            <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="11" y1="11" x2="11" y2="1" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
                <line x1="11" y1="1" x2="1" y2="1" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
              </svg>
            </span>
            <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="1" y2="11" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
                <line x1="1" y1="11" x2="11" y2="11" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
              </svg>
            </span>
            <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="11" y1="1" x2="11" y2="11" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
                <line x1="11" y1="11" x2="1" y2="11" stroke="#C9A646" strokeWidth="0.8" opacity="0.7"/>
              </svg>
            </span>

            <span className="font-cormorant text-gold tracking-[0.3em] text-sm uppercase">
              Save the Date
            </span>
          </button>

          <p className="font-elle text-sage-dark/40 text-xs tracking-widest">
            19 April 2026 · Mijen
          </p>
        </div>

        {/* Penutup */}
        <div className="countdown-info text-center mt-14 space-y-3" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Kami menanti kehadiran Bapak/Ibu/Saudara/i dengan penuh suka cita."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">
            — Chelsea &amp; Ranu —
          </p>
        </div>

      </div>

      <style>{`
        @keyframes flipDown {
          0%   { transform: rotateX(0deg);   opacity: 1; }
          50%  { transform: rotateX(-90deg); opacity: 0.5; background-color: rgba(180,155,100,0.1); }
          100% { transform: rotateX(0deg);   opacity: 1; }
        }
        .count-flip {
          animation: flipDown 0.45s ease-in-out;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}