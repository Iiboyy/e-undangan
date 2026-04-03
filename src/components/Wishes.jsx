import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Data ucapan awal (opsional — bisa diambil dari API/DB)
const initialWishes = [
  {
    name: 'Budi Santoso',
    relation: 'Sahabat',
    message: 'Selamat menempuh hidup baru! Semoga rumah tangga kalian selalu dipenuhi cinta, keberkahan, dan kebahagiaan. Barakallahu lakuma.',
    time: '2 jam lalu',
  },
  {
    name: 'Siti Rahayu',
    relation: 'Keluarga',
    message: 'Moga menjadi keluarga yang sakinah, mawaddah, warahmah. Semoga langgeng sampai kakek nenek ya Chelsea & Ranu! 🤍',
    time: '5 jam lalu',
  },
  {
    name: 'Andi Prasetyo',
    relation: 'Rekan Kerja',
    message: 'Barakallahu fi lailati zafaf wa baaraka alaykumaa. Selamat bahagia selalu!',
    time: '1 hari lalu',
  },
]

function WishCard({ wish, index }) {
  return (
    <div
      className="wish-card opacity-0 border border-gold/15 bg-white/40 backdrop-blur-sm rounded-sm px-6 py-6 space-y-3 transition-all duration-500 hover:border-gold/35 hover:shadow-lg"
      style={{ boxShadow: '0 2px 16px rgba(180,155,100,0.06)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-sage/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="font-cormorant text-gold text-base font-light">
              {wish.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-cormorant text-sage-dark text-base font-semibold">{wish.name}</p>
            <p className="font-elle text-gold/70 text-xs tracking-wider">{wish.relation}</p>
          </div>
        </div>
        <p className="font-elle text-sage-dark/40 text-xs flex-shrink-0 mt-1">{wish.time}</p>
      </div>
      <div className="w-full h-px bg-gold/15" />
      <p className="font-cormorant text-sage-dark/75 text-base leading-relaxed italic">"{wish.message}"</p>
    </div>
  )
}

export default function Wishes() {
  const sectionRef = useRef(null)
  const [wishes, setWishes] = useState(initialWishes)
  const [form, setForm] = useState({ name: '', relation: '', message: '' })
  const [status, setStatus] = useState('idle')
  const wishListRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wishes-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.wishes-title', start: 'top 85%' } }
      )
      gsap.fromTo('.wishes-form-wrap',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '.wishes-form-wrap', start: 'top 80%' } }
      )
      gsap.fromTo('.wish-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.wishes-list', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 800))
    const newWish = {
      name: form.name,
      relation: form.relation || 'Tamu',
      message: form.message,
      time: 'Baru saja',
    }
    setWishes(w => [newWish, ...w])
    setForm({ name: '', relation: '', message: '' })
    setStatus('success')
    setTimeout(() => setStatus('idle'), 2500)
    wishListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={sectionRef} className="relative bg-cream py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sage/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #8B7355 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="wishes-title text-center mb-14 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">Doa & Restu</p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">Ucapan & Doa</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">
            Sampaikan doa dan ucapan terbaik Anda
          </p>
        </div>

        {/* Form kirim ucapan */}
        <div className="wishes-form-wrap opacity-0 mb-12">
          <form onSubmit={handleSubmit}
            className="border border-gold/20 bg-white/40 backdrop-blur-sm rounded-sm px-8 py-8 space-y-5"
            style={{ boxShadow: '0 4px 32px rgba(180,155,100,0.07)' }}
          >
            <p className="font-cormorant text-sage-dark text-xl italic text-center">Tulis Ucapan Anda</p>
            <div className="w-8 h-px bg-gold/30 mx-auto" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-elle text-gold text-xs tracking-widest uppercase">Nama</label>
                <input
                  type="text" name="name" value={form.name} required
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nama Anda"
                  className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-sage-dark text-base placeholder:text-sage-dark/30 transition-colors duration-300"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-elle text-gold text-xs tracking-widest uppercase">Hubungan</label>
                <input
                  type="text" name="relation" value={form.relation}
                  onChange={e => setForm(f => ({ ...f, relation: e.target.value }))}
                  placeholder="Misal: Sahabat, Keluarga..."
                  className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-sage-dark text-base placeholder:text-sage-dark/30 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-elle text-gold text-xs tracking-widest uppercase">Ucapan & Doa</label>
              <textarea
                name="message" value={form.message} required rows={3}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-sage-dark text-base placeholder:text-sage-dark/30 transition-colors duration-300 resize-none"
              />
            </div>

            <button
              type="submit" disabled={status === 'loading'}
              className="w-full py-3 border border-gold/50 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-cream transition-all duration-300 disabled:opacity-50"
            >
              {status === 'loading' ? 'Mengirim...' : status === 'success' ? '✓ Terkirim!' : 'Kirim Ucapan'}
            </button>
          </form>
        </div>

        {/* Daftar ucapan */}
        <div ref={wishListRef} className="wishes-list space-y-4">
          {wishes.map((wish, i) => (
            <WishCard key={i} wish={wish} index={i} />
          ))}
        </div>

        <div className="text-center mt-14 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Doa dari orang-orang terkasih adalah bekal terindah."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">— Chelsea & Ranu —</p>
        </div>
      </div>
    </section>
  )
}