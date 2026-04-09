import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Gallery1 from '../assets/images/gallery1.jpg'
import Gallery2 from '../assets/images/gallery2.jpg'
import Gallery3 from '../assets/images/gallery3.jpg'
import Gallery4 from '../assets/images/gallery4.jpg'
import Gallery5 from '../assets/images/gallery5.jpg'
import Gallery6 from '../assets/images/gallery6.jpg'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  { src: Gallery1},
  { src: Gallery2},
  { src: Gallery3},
  { src: Gallery4},
  { src: Gallery5},
  { src: Gallery6},
]

function PhotoCard({ photo, index, onClick }) {
  return (
    <div
      className={`gallery-item opacity-0 cursor-pointer group overflow-hidden rounded-sm border border-gold/15 transition-all duration-500 hover:border-gold/40 hover:shadow-2xl hover:-translate-y-1
        ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
      `}
      style={{ boxShadow: '0 2px 20px rgba(180,155,100,0.07)' }}
      onClick={() => onClick(index)}
    >
      <div className="relative overflow-hidden bg-sage/10 aspect-square">
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => {
            console.error('Gambar gagal load:', photo.src)
            e.target.style.display = 'none'
            e.target.parentNode.classList.add('photo-placeholder')
          }}
        />
        {/* Placeholder jika foto belum ada */}
        <div className="photo-placeholder-inner absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sage/10 to-gold/10 opacity-0 pointer-events-none">
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-gold/30 mb-2" fill="none" stroke="currentColor">
            <rect x="4" y="8" width="32" height="24" rx="2" strokeWidth="1.2"/>
            <circle cx="14" cy="18" r="3" strokeWidth="1.2"/>
            <path d="M4 28l8-6 6 5 5-4 13 8" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <p className="font-elle text-gold/40 text-xs tracking-widest">Foto Segera Hadir</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sage-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
          <p className="font-cormorant text-cream/90 text-sm italic">{photo.caption}</p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const sectionRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.gallery-title', start: 'top 85%' } }
      )
      gsap.fromTo('.gallery-item',
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section ref={sectionRef} className="relative bg-cream py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #8B7355 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="gallery-title text-center mb-16 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">Our Memories</p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">Galeri Foto</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">Setiap momen yang berharga</p>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} onClick={setLightbox} />
          ))}
        </div>

        <div className="text-center mt-16 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Foto-foto yang menyimpan sejuta kenangan indah."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">— Chelsea & Ranu —</p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-sage-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img 
              src={photos[lightbox].src} 
              alt={photos[lightbox].caption}
              className="w-full rounded-sm border border-gold/20 shadow-2xl object-cover max-h-[80vh]" 
            />
            <p className="text-center font-cormorant text-cream/80 italic text-lg mt-4">{photos[lightbox].caption}</p>
            <div className="flex justify-between mt-4 gap-2">
              <button
                className="font-elle text-gold/70 hover:text-gold text-xs tracking-widest uppercase transition-colors px-3 py-1 rounded-full hover:bg-gold/10"
                onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
              >
                ← Sebelumnya
              </button>
              <button
                className="font-elle text-gold/70 hover:text-gold text-xs tracking-widest uppercase transition-colors px-3 py-1 rounded-full hover:bg-gold/10"
                onClick={() => setLightbox(null)}
              >
                Tutup ✕
              </button>
              <button
                className="font-elle text-gold/70 hover:text-gold text-xs tracking-widest uppercase transition-colors px-3 py-1 rounded-full hover:bg-gold/10"
                onClick={() => setLightbox((lightbox + 1) % photos.length)}
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .photo-placeholder .photo-placeholder-inner { opacity: 1 !important; }
      `}</style>
    </section>
  )
}