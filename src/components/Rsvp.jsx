import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from '@/lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const ATTENDANCE_OPTIONS = [
  { value: 'hadir',       label: 'Insya Allah Hadir' },
  { value: 'tidak_hadir', label: 'Tidak Dapat Hadir' },
]

export default function RSVP() {
  const sectionRef = useRef(null)
  const [form, setForm]   = useState({ nama: '', status: '', jumlah_tamu: 1 })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rsvp-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: '.rsvp-title', start: 'top 85%' } }
      )
      gsap.fromTo('.rsvp-form',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '.rsvp-form', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nama || !form.status) return
    setStatus('loading')

    const { error } = await supabase.from('rsvp').insert({
      guest_id:    form.nama,
      nama:        form.nama,
      status:      form.status,
      jumlah_tamu: form.status === 'hadir' ? form.jumlah_tamu : 1,
    })

    setStatus(error ? 'error' : 'success')
  }

  return (
    <section ref={sectionRef} className="relative bg-cream py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">

        {/* Title */}
        <div className="rsvp-title text-center mb-14 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">Konfirmasi Kehadiran</p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">RSVP</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">
            Mohon konfirmasi kehadiran Anda
          </p>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="rsvp-form text-center py-16 space-y-6 border border-gold/20 rounded-sm bg-white/40 px-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-cormorant text-sage-dark text-2xl italic">Terima Kasih, {form.nama}!</h3>
              <p className="font-elle text-sage-dark/60 text-sm mt-2 leading-relaxed">
                Konfirmasi kehadiran Anda telah kami terima.<br/>
                Kami menantikan kehadiran Anda di hari istimewa kami.
              </p>
            </div>
            <button
              className="font-elle text-gold text-xs tracking-widest uppercase hover:text-sage-dark transition-colors"
              onClick={() => { setStatus('idle'); setForm({ nama: '', status: '', jumlah_tamu: 1 }) }}
            >
              Isi Ulang
            </button>
          </div>

        ) : (
          /* Form */
          <form onSubmit={handleSubmit}
            className="rsvp-form opacity-0 border border-gold/20 bg-white/40 backdrop-blur-sm rounded-sm px-8 py-10 space-y-6"
            style={{ boxShadow: '0 4px 32px rgba(180,155,100,0.07)' }}
          >
            {/* Nama */}
            <div className="space-y-2">
              <label className="font-elle text-gold text-xs tracking-widest uppercase block">Nama Lengkap</label>
              <input
                type="text" value={form.nama} required
                onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                placeholder="Masukkan nama Anda"
                className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-sage-dark text-lg placeholder:text-sage-dark/30 transition-colors duration-300"
              />
            </div>

            {/* Kehadiran */}
            <div className="space-y-3">
              <label className="font-elle text-gold text-xs tracking-widest uppercase block">Konfirmasi Kehadiran</label>
              <div className="space-y-2">
                {ATTENDANCE_OPTIONS.map(opt => (
                  <label key={opt.value}
                    className={`flex items-center gap-3 cursor-pointer py-2.5 px-3 border transition-all duration-300 rounded-sm
                      ${form.status === opt.value
                        ? 'border-gold/50 bg-gold/5'
                        : 'border-transparent hover:border-gold/20'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                      ${form.status === opt.value ? 'border-gold' : 'border-gold/30'}`}>
                      {form.status === opt.value && <div className="w-2 h-2 rounded-full bg-gold" />}
                    </div>
                    <input
                      type="radio" value={opt.value} className="hidden"
                      onChange={() => setForm(f => ({ ...f, status: opt.value }))}
                    />
                    <span className="font-cormorant text-sage-dark text-base">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Jumlah tamu — hanya muncul jika hadir */}
            {form.status === 'hadir' && (
              <div className="space-y-2">
                <label className="font-elle text-gold text-xs tracking-widest uppercase block">Jumlah Tamu</label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4].map(n => (
                    <button key={n} type="button"
                      onClick={() => setForm(f => ({ ...f, jumlah_tamu: n }))}
                      className={`w-10 h-10 border text-sm font-cormorant transition-all duration-300
                        ${form.jumlah_tamu === n
                          ? 'border-gold bg-gold text-cream'
                          : 'border-gold/30 text-sage-dark hover:border-gold/60'}`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="font-elle text-sage-dark/50 text-xs">orang</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <p className="font-elle text-red-400 text-xs tracking-wider text-center">
                Terjadi kesalahan. Silakan coba lagi.
              </p>
            )}

            <button
              type="submit" disabled={status === 'loading'}
              className="w-full py-3.5 border border-gold/50 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-cream transition-all duration-300 disabled:opacity-50"
            >
              {status === 'loading' ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="text-center mt-14 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Kehadiran Anda adalah hadiah terindah bagi kami."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">— Chelsea & Ranu —</p>
        </div>

      </div>
    </section>
  )
}