import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import gsap from 'gsap'

export default function Opening({ onOpen }) {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  const containerRef = useRef(null)
  const namaRef = useRef(null)

  useEffect(() => {
    // fetch nama tamu
    const fetchGuest = async () => {
      if (!id) return
      const { data } = await supabase
        .from('guests')
        .select('nama')
        .eq('kode_unik', id)
        .single()

      if (data && namaRef.current) {
        namaRef.current.textContent = `Kepada Yth. ${data.nama}`
      }
    }
    fetchGuest()

    // animasi masuk
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    )
  }, [id])

  const handleOpen = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: onOpen
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-sage-dark flex flex-col items-center justify-center z-50 px-6"
    >
      {/* Ornamen atas */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <div className="w-32 h-px bg-gold-light opacity-60" />
      </div>

      {/* Konten */}
      <div className="text-center space-y-6">
        <p className="text-gold-light font-cormorant text-sm tracking-[0.3em] uppercase">
          The Wedding of
        </p>

        <h1 className="font-cormorant text-cream text-5xl md:text-7xl font-light italic">
          Chelsea <span className="text-gold">&</span> Ranu
        </h1>

        <p className="text-cream/60 font-elle text-sm tracking-widest uppercase">
          19 April 2026
        </p>

        <div className="w-16 h-px bg-gold mx-auto opacity-50" />

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

      {/* Ornamen bawah */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="w-32 h-px bg-gold-light opacity-60" />
      </div>
    </div>
  )
}