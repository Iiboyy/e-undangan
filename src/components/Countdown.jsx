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
        className={`relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-sm overflow-hidden
          bg-cream border border-gold/30 shadow-md
          ${flip ? 'count-flip' : ''}`}
        style={{
          boxShadow: '0 2px 16px 0 rgba(180,155,100,0.10), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Top half shine */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 pointer-events-none" />
        {/* Separator line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gold/20 pointer-events-none" />
        <span className="font-cormorant text-4xl md:text-5xl font-light text-sage-dark select-none">
          {pad(value)}
        </span>
      </div>
      <p className="font-elle text-gold text-xs tracking-[0.25em] uppercase">{label}</p>
    </div>
  )
}

export default function Countdown() {
  const sectionRef = useRef(null)
  const [time, setTime] = useState(getTimeLeft())
  const [prevTime, setPrevTime] = useState(getTimeLeft())
  const [flipped, setFlipped] = useState({ days: false, hours: false, minutes: false, seconds: false })

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft()
      setFlipped({
        days: next.days !== prevTime.days,
        hours: next.hours !== prevTime.hours,
        minutes: next.minutes !== prevTime.minutes,
        seconds: next.seconds !== prevTime.seconds,
      })
      setPrevTime(time)
      setTime(next)
    }, 1000)
    return () => clearInterval(interval)
  }, [time, prevTime])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.countdown-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: '.countdown-title',
            start: 'top 85%',
          }
        }
      )

      gsap.fromTo('.countdown-box',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.countdown-wrapper',
            start: 'top 80%',
          }
        }
      )

      gsap.fromTo('.countdown-info',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, delay: 0.3,
          scrollTrigger: {
            trigger: '.countdown-info',
            start: 'top 90%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const isDone = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 px-6 overflow-hidden"
    >
      {/* Background dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        {/* Subtle floral/dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #8B7355 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Title */}
        <div className="countdown-title text-center mb-14 space-y-3 opacity-0">
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
            Menuju Hari Bahagia Chelsea & Ranu
          </p>
        </div>

        {/* Countdown boxes */}
        <div className="countdown-wrapper flex justify-center">
          {isDone ? (
            <div className="text-center space-y-3 py-8">
              <p className="font-cormorant text-sage-dark text-3xl italic">
                Hari yang ditunggu telah tiba! 🎉
              </p>
              <p className="font-elle text-gold text-sm tracking-widest">
                Semoga menjadi berkah bagi keduanya.
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-4 md:gap-8">
              <div className="countdown-box opacity-0">
                <CountBox value={time.days} label="Hari" flip={flipped.days} />
              </div>

              {/* Separator */}
              <div className="flex flex-col items-center justify-center h-20 md:h-24 gap-2 mt-0">
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
              </div>

              <div className="countdown-box opacity-0">
                <CountBox value={time.hours} label="Jam" flip={flipped.hours} />
              </div>

              <div className="flex flex-col items-center justify-center h-20 md:h-24 gap-2 mt-0">
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
              </div>

              <div className="countdown-box opacity-0">
                <CountBox value={time.minutes} label="Menit" flip={flipped.minutes} />
              </div>

              <div className="flex flex-col items-center justify-center h-20 md:h-24 gap-2 mt-0">
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
                <div className="w-1 h-1 bg-gold/60 rounded-full" />
              </div>

              <div className="countdown-box opacity-0">
                <CountBox value={time.seconds} label="Detik" flip={flipped.seconds} />
              </div>
            </div>
          )}
        </div>

        {/* Event Info */}
        <div className="countdown-info opacity-0 mt-16 space-y-8">

          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-16 h-px bg-gold/40" />
          </div>

          {/* Two events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

            {/* Akad Nikah */}
            <div className="text-center space-y-3 group">
              <div
                className="mx-auto w-full max-w-xs rounded-sm px-6 py-7 border border-gold/20 bg-white/40 backdrop-blur-sm transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-lg"
                style={{ boxShadow: '0 2px 24px 0 rgba(180,155,100,0.07)' }}
              >
                <p className="font-cormorant text-gold tracking-[0.3em] text-xs uppercase mb-3">
                  Akad Nikah
                </p>
                <h3 className="font-cormorant text-sage-dark text-2xl italic font-light mb-4">
                  Jumat, 13 Februari 2026
                </h3>
                <div className="w-8 h-px bg-gold/40 mx-auto mb-4" />
                <div className="space-y-1">
                  <p className="font-elle text-sage-dark/70 text-sm">
                    Pukul 09.00 WIB
                  </p>
                  <p className="font-elle text-sage-dark/60 text-sm leading-relaxed">
                    KUA Kecamatan Semarang Utara
                  </p>
                </div>
              </div>
            </div>

            {/* Resepsi */}
            <div className="text-center space-y-3 group">
              <div
                className="mx-auto w-full max-w-xs rounded-sm px-6 py-7 border border-gold/20 bg-white/40 backdrop-blur-sm transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-lg"
                style={{ boxShadow: '0 2px 24px 0 rgba(180,155,100,0.07)' }}
              >
                <p className="font-cormorant text-gold tracking-[0.3em] text-xs uppercase mb-3">
                  Resepsi Pernikahan
                </p>
                <h3 className="font-cormorant text-sage-dark text-2xl italic font-light mb-4">
                  Minggu, 19 April 2026
                </h3>
                <div className="w-8 h-px bg-gold/40 mx-auto mb-4" />
                <div className="space-y-1">
                  <p className="font-elle text-sage-dark/70 text-sm">
                    Pukul 12.00 – 13.00 WIB
                  </p>
                  <p className="font-elle text-sage-dark/60 text-sm leading-relaxed">
                    Pendopo Kinanthi<br />
                    Krajan RT 2 RW 5, Wonolopo<br />
                    Kec. Mijen, Semarang
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Penutup */}
          <div className="text-center mt-10 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold rotate-45" />
              <div className="w-12 h-px bg-gold/50" />
            </div>
            <p className="font-cormorant text-sage-dark/60 text-lg italic">
              "Kami menanti kehadiran Bapak/Ibu/Saudara/i dengan penuh suka cita."
            </p>
            <p className="font-elle text-gold text-sm tracking-widest">
              — Chelsea & Ranu —
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes flipDown {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(-90deg); opacity: 0.4; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        .count-flip {
          animation: flipDown 0.45s ease-in-out;
        }
      `}</style>
    </section>
  )
}