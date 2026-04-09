import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stories = [
  {
    year: '2011–2012',
    title: 'Awal Pertemuan',
    desc: 'Pertemuan sederhana terjadi di bangku Sekolah Menengah Pertama. Pada masa itu, yang hadir hanyalah perasaan ringan khas remaja—belum dalam, namun cukup untuk meninggalkan kesan yang tak terlupakan.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M6 32V12a2 2 0 012-2h10v22H6z" stroke="#C9A646" strokeWidth="1.2" fill="none"/>
        <path d="M18 10h10a2 2 0 012 2v20H18V10z" stroke="#C9A646" strokeWidth="1.2" fill="none"/>
        <path d="M10 15h4M10 19h4M10 23h4" stroke="#C9A646" strokeWidth="1" strokeLinecap="round"/>
        <path d="M22 15h4M22 19h4M22 23h4" stroke="#C9A646" strokeWidth="1" strokeLinecap="round"/>
        <path d="M4 32h32" stroke="#C9A646" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    blob: 'radial-gradient(ellipse at 80% 50%, #C9A64615 0%, transparent 65%)',
  },
  {
    year: '2022',
    title: 'Dipertemukan Kembali',
    desc: 'Setelah waktu memisahkan dalam diam, takdir mempertemukan kembali dalam versi yang lebih dewasa. Percakapan yang terjalin membawa makna baru, menghadirkan kembali rasa yang pernah ada.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect x="6" y="8" width="28" height="20" rx="4" stroke="#C9A646" strokeWidth="1.2"/>
        <path d="M6 14l14 9 14-9" stroke="#C9A646" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="30" cy="30" r="6" fill="#f5f0e8" stroke="#C9A646" strokeWidth="1.2"/>
        <path d="M28 30l1.5 1.5L32 28" stroke="#C9A646" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    blob: 'radial-gradient(ellipse at 20% 50%, #7D9B7620 0%, transparent 65%)',
  },
  {
    year: '2023',
    title: 'Keseriusan',
    desc: 'Hubungan yang terjalin tidak lagi sekadar perasaan, melainkan mulai diarahkan pada tujuan. Komitmen tumbuh seiring waktu, diiringi usaha untuk saling memahami, menjaga, dan menguatkan satu sama lain.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M20 34C20 34 8 26 8 17a8 8 0 0112-6.93A8 8 0 0132 17c0 9-12 17-12 17z" stroke="#C9A646" strokeWidth="1.2" fill="none"/>
        <circle cx="20" cy="17" r="3" stroke="#C9A646" strokeWidth="1.2"/>
      </svg>
    ),
    blob: 'radial-gradient(ellipse at 80% 50%, #C9A64612 0%, transparent 65%)',
  },
  {
    year: '2025–2026',
    title: 'Menuju Selamanya',
    desc: 'Dengan keyakinan dan restu keluarga, langkah besar pun diambil. Lamaran menjadi awal dari janji yang diteguhkan, hingga akhirnya pada 13 Februari 2026, terucap ikrar suci dalam ikatan pernikahan.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="20" cy="20" r="10" stroke="#C9A646" strokeWidth="1.2"/>
        <circle cx="20" cy="20" r="6" stroke="#C9A646" strokeWidth="0.8" strokeDasharray="2 2"/>
        <path d="M14 20a6 6 0 016-6" stroke="#C9A646" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="29" cy="11" r="3" fill="#f5f0e8" stroke="#C9A646" strokeWidth="1.2"/>
        <path d="M28 11h2M29 10v2" stroke="#C9A646" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    blob: 'radial-gradient(ellipse at 20% 50%, #7D9B7615 0%, transparent 65%)',
  },
]

// Corner ornament component — Varian A: Fine Line Geometric
function CornerOrnament({ position = 'tl', size = 52 }) {
  const isTop = position.startsWith('t')
  const isLeft = position.endsWith('l')

  // Arah flip berdasarkan posisi
  const scaleX = isLeft ? 1 : -1
  const scaleY = isTop ? 1 : -1

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: 'center',
      }}
    >
      {/* Lapis 1 — paling tebal, paling luar */}
      <line x1="8" y1="44" x2="8" y2="8" stroke="#C9A646" strokeWidth="0.9" opacity="0.85"/>
      <line x1="8" y1="8" x2="44" y2="8" stroke="#C9A646" strokeWidth="0.9" opacity="0.85"/>

      {/* Tick kecil di lapis 1 */}
      <line x1="22" y1="8" x2="22" y2="13" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="36" y1="8" x2="36" y2="16" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="8" y1="22" x2="13" y2="22" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>
      <line x1="8" y1="36" x2="16" y2="36" stroke="#C9A646" strokeWidth="0.6" opacity="0.5"/>

      {/* Lapis 2 — sedikit ke dalam */}
      <line x1="13" y1="44" x2="13" y2="13" stroke="#C9A646" strokeWidth="0.7" opacity="0.55"/>
      <line x1="13" y1="13" x2="44" y2="13" stroke="#C9A646" strokeWidth="0.7" opacity="0.55"/>

      {/* Lapis 3 — paling dalam, paling tipis */}
      <line x1="18" y1="38" x2="18" y2="18" stroke="#C9A646" strokeWidth="0.45" opacity="0.3"/>
      <line x1="18" y1="18" x2="38" y2="18" stroke="#C9A646" strokeWidth="0.45" opacity="0.3"/>

      {/* Titik sudut — anchor gold */}
      <circle cx="8" cy="8" r="1.8" fill="#C9A646" opacity="0.9"/>
    </svg>
  )
}

export default function LoveStory() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.story-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: '.story-title',
            start: 'top 85%',
          }
        }
      )

      // Corner ornaments fade in
      gsap.fromTo('.corner-ornament',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      )

      // Parallax garis timeline tumbuh dari atas
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.story-wrapper',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          }
        }
      )

      // Watercolor blobs parallax
      gsap.utils.toArray('.story-blob').forEach((blob) => {
        gsap.to(blob, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: blob,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      })

      gsap.fromTo('.story-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.story-wrapper',
            start: 'top 80%',
          }
        }
      )

      // Icon pop-in per item
      gsap.utils.toArray('.story-icon').forEach((icon) => {
        gsap.fromTo(icon,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 88%',
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 px-6 overflow-hidden"
    >
      {/* Background dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* ── Corner Ornaments ── */}
      <div className="corner-ornament absolute top-0 left-0 pointer-events-none opacity-0">
        <CornerOrnament position="tl" size={52} />
      </div>
      <div className="corner-ornament absolute top-0 right-0 pointer-events-none opacity-0">
        <CornerOrnament position="tr" size={52} />
      </div>
      <div className="corner-ornament absolute bottom-0 left-0 pointer-events-none opacity-0">
        <CornerOrnament position="bl" size={52} />
      </div>
      <div className="corner-ornament absolute bottom-0 right-0 pointer-events-none opacity-0">
        <CornerOrnament position="br" size={52} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Title */}
        <div className="story-title text-center mb-16 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase font-medium">
            Our Journey
          </p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">
            Love Story
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">
            Chelsea & Ranu
          </p>
        </div>

        {/* Timeline */}
        <div className="story-wrapper relative">

          {/* Garis tengah — parallax */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block"
            style={{ transformOrigin: 'top center' }}
          />

          <div className="space-y-12 md:space-y-0">
            {stories.map((story, i) => (
              <div
                key={i}
                className="story-item opacity-0 relative md:grid md:grid-cols-2 md:gap-12 mb-12"
              >
                {/* Watercolor blob per item */}
                <div
                  className="story-blob absolute inset-0 pointer-events-none -z-10 rounded-3xl"
                  style={{ background: story.blob, filter: 'blur(40px)' }}
                />

                {i % 2 === 0 ? (
                  <>
                    {/* Kiri */}
                    <div className="md:text-right space-y-2 md:pr-8">
                      {/* Icon — rata kanan di desktop */}
                      <div className="story-icon flex md:justify-end justify-start mb-3">
                        {story.icon}
                      </div>
                      <p className="font-cormorant text-gold text-3xl font-light">
                        {story.year}
                      </p>
                      <h3 className="font-cormorant text-sage-dark text-xl italic">
                        {story.title}
                      </h3>
                      <p className="font-elle text-sage-dark/70 text-sm leading-relaxed">
                        {story.desc}
                      </p>
                    </div>
                    {/* Dot tengah */}
                    <div className="hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full border-2 border-cream" />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    {/* Dot tengah */}
                    <div className="hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full border-2 border-cream" />
                    {/* Kanan */}
                    <div className="md:text-left space-y-2 md:pl-8">
                      {/* Icon */}
                      <div className="story-icon flex justify-start mb-3">
                        {story.icon}
                      </div>
                      <p className="font-cormorant text-gold text-3xl font-light">
                        {story.year}
                      </p>
                      <h3 className="font-cormorant text-sage-dark text-xl italic">
                        {story.title}
                      </h3>
                      <p className="font-elle text-sage-dark/70 text-sm leading-relaxed">
                        {story.desc}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Penutup */}
        <div className="story-item opacity-0 text-center mt-16 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Bukan tentang seberapa lama mengenal, melainkan tentang memilih untuk tetap bersama dalam setiap keadaan."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest font-medium">
            — Chelsea & Ranu —
          </p>
        </div>

      </div>
    </section>
  )
}