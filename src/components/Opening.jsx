import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import gsap from 'gsap'

// images
import hero1 from '../assets/images/hero1.jpg'
import hero2 from '../assets/images/hero2.jpg'
import hero3 from '../assets/images/hero3.jpg'

const SLIDESHOW_IMAGES = [hero1, hero2, hero3]

export default function Opening({ onOpen }) {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  const containerRef = useRef(null)
  const namaRef = useRef(null)

  const [guest, setGuest] = useState(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentImgRef = useRef(null)
  const nextImgRef = useRef(null)
  const slideIntervalRef = useRef(null)

  // 🔥 Fetch data tamu
  useEffect(() => {
    const fetchGuest = async () => {
      if (!id) return

      const { data, error } = await supabase
        .from('guests')
        .select('nama, kloter, jam')
        .eq('kode', id)
        .single()

      if (error) {
        console.error('Error fetching guest:', error)
        return
      }

      if (data) {
        setGuest(data)

        if (namaRef.current) {
          namaRef.current.textContent = `Kepada Yth. ${data.nama}`
        }
      }
    }

    fetchGuest()

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    )
  }, [id])

  // 🔥 Slideshow
  useEffect(() => {
    if (SLIDESHOW_IMAGES.length <= 1) return

    slideIntervalRef.current = setInterval(() => {
      const next = (currentSlide + 1) % SLIDESHOW_IMAGES.length
      setNextSlide(next)
      setIsTransitioning(true)

      if (nextImgRef.current) {
        gsap.fromTo(
          nextImgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.9,
            ease: 'power2.inOut',
            onComplete: () => {
              setCurrentSlide(next)
              setIsTransitioning(false)
            }
          }
        )
      }
    }, 4000)

    return () => clearInterval(slideIntervalRef.current)
  }, [currentSlide])

  const handleOpen = () => {
    clearInterval(slideIntervalRef.current)
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: onOpen
    })
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex">
      
      {/* LEFT */}
      <div className="hidden lg:block relative flex-1 overflow-hidden">
        <img
          ref={currentImgRef}
          src={SLIDESHOW_IMAGES[currentSlide]}
          alt="Wedding photo"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {isTransitioning && (
          <img
            ref={nextImgRef}
            src={SLIDESHOW_IMAGES[nextSlide]}
            alt="Wedding photo"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0 }}
          />
        )}

        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#2D3D2A] opacity-80" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDESHOW_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentSlide
                  ? 'w-6 h-1.5 bg-gold'
                  : 'w-1.5 h-1.5 bg-gold/40'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-8">
          <p className="text-cream/30 font-cormorant text-xs tracking-widest uppercase">
            19 April 2026
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-[420px] xl:w-[480px] bg-sage-dark flex flex-col items-center justify-center relative px-10 shrink-0">
        
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <div className="w-32 h-px bg-gold-light opacity-60" />
        </div>

        <div className="text-center space-y-6 w-full">
          <p className="text-gold-light font-cormorant text-sm tracking-[0.3em] uppercase">
            The Wedding of
          </p>

          <h1 className="font-cormorant text-cream text-5xl xl:text-6xl font-light italic leading-tight">
            Chelsea <span className="text-gold">&</span> Ranu
          </h1>

          <p className="text-cream/60 font-elle text-sm tracking-widest uppercase">
            19 April 2026
          </p>

          <div className="w-16 h-px bg-gold mx-auto opacity-50" />

          {/* 🔥 Nama tamu */}
          <p
            ref={namaRef}
            className="text-cream/80 font-cormorant text-lg italic"
          >
            Kepada Yth. Tamu Undangan
          </p>

          <button
            onClick={handleOpen}
            className="mt-8 px-10 py-3 border border-gold text-gold font-cormorant text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-sage-dark transition-all duration-500 cursor-pointer"
          >
            Buka Undangan
          </button>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="w-32 h-px bg-gold-light opacity-60" />
        </div>
      </div>
    </div>
  )
}