  import { useEffect, useRef } from 'react'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

const stories = [
  {
    year: '2011–2012',
    title: 'Awal Pertemuan',
    desc: 'Pertemuan sederhana terjadi di bangku Sekolah Menengah Pertama. Pada masa itu, yang hadir hanyalah perasaan ringan khas remaja—belum dalam, namun cukup untuk meninggalkan kesan yang tak terlupakan.'
  },
  {
    year: '2022',
    title: 'Dipertemukan Kembali',
    desc: 'Setelah waktu memisahkan dalam diam, takdir mempertemukan kembali dalam versi yang lebih dewasa. Percakapan yang terjalin membawa makna baru, menghadirkan kembali rasa yang pernah ada.'
  },
  {
    year: '2023',
    title: 'Keseriusan',
    desc: 'Hubungan yang terjalin tidak lagi sekadar perasaan, melainkan mulai diarahkan pada tujuan. Komitmen tumbuh seiring waktu, diiringi usaha untuk saling memahami, menjaga, dan menguatkan satu sama lain.'
  },
  {
    year: '2025–2026',
    title: 'Menuju Selamanya',
    desc: 'Dengan keyakinan dan restu keluarga, langkah besar pun diambil. Lamaran menjadi awal dari janji yang diteguhkan, hingga akhirnya pada 13 Februari 2026, terucap ikrar suci dalam ikatan pernikahan.'
  },
]

  export default function LoveStory() {
    const sectionRef = useRef(null)

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

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Title */}
          <div className="story-title text-center mb-16 space-y-3 opacity-0">
            <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">
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

            {/* Garis tengah */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {stories.map((story, i) => (
                <div
                  key={i}
                  className={`story-item opacity-0 relative md:grid md:grid-cols-2 md:gap-12 mb-12`}
                >
                  {i % 2 === 0 ? (
                    <>
                      {/* Kiri */}
                      <div className="md:text-right space-y-2 md:pr-8">
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
                      {/* Kanan kosong */}
                      <div />
                    </>
                  ) : (
                    <>
                      {/* Kiri kosong */}
                      <div />
                      {/* Dot tengah */}
                      <div className="hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full border-2 border-cream" />
                      {/* Kanan */}
                      <div className="md:text-left space-y-2 md:pl-8">
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
            <p className="font-elle text-gold text-sm tracking-widest">
              — Chelsea & Ranu —
            </p>
          </div>

        </div>
      </section>
    )
  }