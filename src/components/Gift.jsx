import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const gifts = [
  {
    type: 'Transfer Bank',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="32" height="22" rx="2" strokeWidth="1.2"/>
        <path d="M4 16h32" strokeWidth="1.2"/>
        <rect x="8" y="22" width="8" height="5" rx="0.5" strokeWidth="1"/>
      </svg>
    ),
    accounts: [
      {
        bank: 'BCA',
        number: '1234567890',
        name: 'Chelsea Rosari Mahakintha S.',
      },
      {
        bank: 'Mandiri',
        number: '0987654321',
        name: 'Ranu Barta Fahrizal',
      },
    ],
  },
  {
    type: 'Amplop Digital',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="32" height="22" rx="2" strokeWidth="1.2"/>
        <path d="M4 14l16 10 16-10" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    qris: {
      label: 'Scan QRIS',
      image: '/images/qris.png', // ganti dengan path QRIS asli
      note: 'QRIS berlaku untuk semua dompet digital & bank',
    },
  },
  {
    type: 'Kirim ke Rumah',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32V18M32 32V18" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M4 18l16-12 16 12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="15" y="22" width="10" height="10" rx="1" strokeWidth="1.2"/>
        <path d="M8 32h24" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    address: {
      name: 'Chelsea Rosari / Ranu Barta',
      detail: 'Jl. Gondomono No. 9 RT 1 RW 9\nKel. Bulu Lor, Kec. Semarang Utara\nKota Semarang, Jawa Tengah\nKode Pos: 50174',
      note: 'Mohon hubungi kami terlebih dahulu sebelum mengirimkan hadiah.',
      phone: '+62 812-XXXX-XXXX', // ganti nomor asli
    },
  },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gold/30 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-cream transition-all duration-300"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor"><path d="M1 6l3.5 3.5L11 2"/></svg>
          Disalin!
        </>
      ) : (
        <>
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="4" y="1" width="7" height="8" rx="1"/>
            <rect x="1" y="4" width="7" height="8" rx="1"/>
          </svg>
          Salin
        </>
      )}
    </button>
  )
}

export default function Gift() {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gift-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.gift-title', start: 'top 85%' } }
      )
      gsap.fromTo('.gift-body',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '.gift-body', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const active = gifts[activeTab]

  return (
    <section ref={sectionRef} className="relative bg-cream py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #8B7355 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="gift-title text-center mb-14 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">Wedding Gift</p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">Hadiah Pernikahan</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">
            Doa restu Anda adalah hadiah terindah bagi kami
          </p>
          <p className="font-elle text-sage-dark/50 text-sm leading-relaxed max-w-sm mx-auto">
            Bagi Anda yang ingin memberikan tanda kasih, kami menerima dengan penuh syukur melalui salah satu cara berikut.
          </p>
        </div>

        <div className="gift-body opacity-0">
          {/* Tabs */}
          <div className="flex gap-0 mb-8 border border-gold/20 rounded-sm overflow-hidden">
            {gifts.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-3 px-2 font-elle text-xs tracking-wider uppercase transition-all duration-300 flex flex-col items-center gap-1.5
                  ${activeTab === i
                    ? 'bg-gold text-cream'
                    : 'text-gold/70 hover:text-gold hover:bg-gold/5'}`}
              >
                <span className={`transition-colors ${activeTab === i ? 'text-cream' : 'text-gold/50'}`}>
                  {g.icon}
                </span>
                <span className="hidden md:block">{g.type}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            key={activeTab}
            className="border border-gold/20 bg-white/40 backdrop-blur-sm rounded-sm px-8 py-10 space-y-6"
            style={{
              boxShadow: '0 4px 32px rgba(180,155,100,0.07)',
              animation: 'fadeSlideIn 0.35s ease-out',
            }}
          >
            <div className="flex items-center gap-3 justify-center text-gold/60">
              {active.icon}
              <h3 className="font-cormorant text-sage-dark text-2xl italic font-light">{active.type}</h3>
            </div>
            <div className="w-8 h-px bg-gold/30 mx-auto" />

            {/* Transfer Bank */}
            {active.accounts && (
              <div className="space-y-5">
                {active.accounts.map((acc, i) => (
                  <div key={i} className="border border-gold/15 rounded-sm px-5 py-5 space-y-3 bg-white/30">
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-gold text-xl font-light tracking-wide">{acc.bank}</span>
                      <CopyButton text={acc.number} />
                    </div>
                    <p className="font-cormorant text-sage-dark text-2xl tracking-widest font-light">{acc.number}</p>
                    <p className="font-elle text-sage-dark/60 text-xs tracking-wider uppercase">{acc.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* QRIS */}
            {active.qris && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-48 h-48 border border-gold/20 rounded-sm overflow-hidden bg-white/60 flex items-center justify-center">
                  <img
                    src={active.qris.image}
                    alt="QRIS"
                    className="w-full h-full object-contain"
                    onError={e => {
                      e.target.parentNode.innerHTML = `
                        <div class="flex flex-col items-center gap-2 p-4">
                          <svg viewBox="0 0 48 48" class="w-16 h-16 text-gold/30" fill="none" stroke="currentColor">
                            <rect x="6" y="6" width="14" height="14" rx="1" stroke-width="1.2"/>
                            <rect x="28" y="6" width="14" height="14" rx="1" stroke-width="1.2"/>
                            <rect x="6" y="28" width="14" height="14" rx="1" stroke-width="1.2"/>
                            <rect x="9" y="9" width="8" height="8" rx="0.5" fill="currentColor" opacity="0.3"/>
                            <rect x="31" y="9" width="8" height="8" rx="0.5" fill="currentColor" opacity="0.3"/>
                            <rect x="9" y="31" width="8" height="8" rx="0.5" fill="currentColor" opacity="0.3"/>
                            <path d="M28 28h4v4h-4zM36 28h6v4h-6zM28 36h6v6h-6zM38 36h2v6h-2z" fill="currentColor" opacity="0.3"/>
                          </svg>
                          <p class="font-elle text-gold/40 text-xs">Upload QRIS</p>
                        </div>
                      `
                    }}
                  />
                </div>
                <p className="font-elle text-sage-dark/50 text-xs leading-relaxed">{active.qris.note}</p>
              </div>
            )}

            {/* Alamat */}
            {active.address && (
              <div className="space-y-4">
                <div className="border border-gold/15 rounded-sm px-5 py-5 space-y-3 bg-white/30">
                  <p className="font-cormorant text-sage-dark text-lg italic font-semibold">{active.address.name}</p>
                  <div className="w-6 h-px bg-gold/30" />
                  <p className="font-elle text-sage-dark/70 text-sm leading-relaxed whitespace-pre-line">
                    {active.address.detail}
                  </p>
                </div>
                <p className="font-elle text-sage-dark/50 text-xs leading-relaxed text-center">
                  {active.address.note}
                </p>
                <a
                  href={`https://wa.me/${active.address.phone.replace(/\D/g,'')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gold/30 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-cream transition-all duration-300"
                >
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 1.763.46 3.417 1.265 4.853L0 20l5.293-1.25A9.956 9.956 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm5.043 14.232c-.21.588-1.225 1.124-1.69 1.172-.464.048-.452.348-2.844-.593-2.39-.938-3.837-3.297-3.952-3.449-.114-.152-.93-1.238-.93-2.363 0-1.125.586-1.678.794-1.906.21-.228.457-.285.61-.285l.436.008c.14.006.33-.053.517.394.19.449.643 1.569.7 1.683.057.114.095.248.018.4-.076.152-.114.248-.228.38-.114.135-.24.3-.343.403-.114.114-.232.237-.1.465.133.228.59.97 1.267 1.571.87.78 1.603 1.02 1.83 1.134.228.114.36.095.494-.057.133-.152.57-.665.722-.893.152-.228.304-.19.513-.114.21.076 1.33.626 1.558.74.228.114.38.171.437.267.057.095.057.55-.152 1.13z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-14 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Keikhlasan Anda jauh lebih berharga dari apapun."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">— Chelsea & Ranu —</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}