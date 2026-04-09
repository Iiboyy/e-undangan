import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    type: 'Akad Nikah',
    date: 'Jumat, 13 Februari 2026',
    time: '09.00 WIB',
    place: 'KUA Kecamatan Semarang Utara',
    address: 'Jl. Gondomono No. 9, Kel. Bulu Lor\nKec. Semarang Utara, Kota Semarang',
    mapsUrl: 'https://maps.google.com/?q=KUA+Semarang+Utara',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M20 2v4M20 34v4M2 20h4M34 20h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    type: 'Resepsi Pernikahan',
    date: 'Minggu, 19 April 2026',
    time: '11.00 – 14.00 WIB',
    place: 'Pendopo Kinanthi',
    address: 'Krajan RT 2 RW 5, Kel. Wonolopo\nKec. Mijen, Kota Semarang',
    mapsUrl: 'https://maps.google.com/?q=Pendopo+Kinanthi+Mijen+Semarang',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32V18M32 32V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M4 18l16-12 16 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="15" y="22" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 32h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Events() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.events-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.events-title', start: 'top 85%' } }
      )
      gsap.fromTo('.event-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.25, ease: 'power2.out',
          scrollTrigger: { trigger: '.events-grid', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-cream py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="events-title text-center mb-16 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">Save The Date</p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">Rangkaian Acara</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">Chelsea & Ranu</p>
        </div>

        <div className="events-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev, i) => (
            <div key={i} className="event-card opacity-0 group">
              <div
                className="h-full border border-gold/20 bg-white/40 backdrop-blur-sm rounded-sm px-8 py-10 text-center space-y-5 transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-xl group-hover:-translate-y-1"
                style={{ boxShadow: '0 4px 32px 0 rgba(180,155,100,0.08)' }}
              >
                <div className="flex justify-center text-gold/70">{ev.icon}</div>
                <div>
                  <p className="font-cormorant text-gold tracking-[0.3em] text-xs uppercase mb-3">{ev.type}</p>
                  <h3 className="font-cormorant text-sage-dark text-2xl italic font-light">{ev.date}</h3>
                </div>
                <div className="w-8 h-px bg-gold/40 mx-auto" />
                <div className="space-y-1">
                  <p className="font-cormorant text-sage-dark text-lg">{ev.time}</p>
                  <p className="font-cormorant text-sage-dark font-semibold text-lg italic">{ev.place}</p>
                  <p className="font-elle text-sage-dark/60 text-sm leading-relaxed whitespace-pre-line">{ev.address}</p>
                </div>
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 border border-gold/40 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-cream transition-all duration-300"
                >
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><path d="M8 0C5.243 0 3 2.243 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.757-2.243-5-5-5zm0 7.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>
                  Lihat Lokasi
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="event-card opacity-0 text-center mt-16 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">— Chelsea & Ranu —</p>
        </div>
      </div>
    </section>
  )
}