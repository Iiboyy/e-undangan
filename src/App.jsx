import { useRef, useState, useEffect } from 'react'
import Opening from './components/Opening'
import Hero from './components/Hero'
import Couple from './components/Couple'
import LoveStory from './components/LoveStory'
import Countdown from './components/Countdown'
import Events from './components/Events'
import Gallery from './components/Gallery'
import RSVP from './components/Rsvp'
import Wishes from './components/Wishes'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import AdminRsvp from './components/AdminRsvp'

function App() {
  const [isOpened, setIsOpened] = useState(false)
  // 🔥 State global untuk menyimpan data tamu dari Supabase
  const [guest, setGuest] = useState(null) 
  
  const audioRef = useRef(null)

  // Cek apakah ini halaman admin: /admin
  const isAdmin = window.location.pathname === '/admin'

  // Fungsi ini dipanggil saat tombol "Buka Undangan" di klik
  const handleOpen = (guestData) => {
    // Simpan data tamu yang berhasil di-fetch oleh Opening ke state global
    if (guestData) {
      setGuest(guestData)
    }

    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction")
      })
    }
    setIsOpened(true)
  }

  // --- Efek Audio & Musik ---
  useEffect(() => {
    if (isAdmin) return
    const handleVisibilityChange = () => {
      if (!audioRef.current) return
      if (document.hidden) {
        if (!audioRef.current.paused) audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.log("Cannot resume audio:", err))
      }
    }
    const handlePageUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handlePageUnload)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handlePageUnload)
    }
  }, [isAdmin])

  useEffect(() => {
    if (isAdmin) return
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile && audioRef.current) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => audioRef.current?.play())
        navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause())
      }
      const handleLockScreen = () => {
        if (document.hidden && !audioRef.current.paused) audioRef.current.pause()
      }
      document.addEventListener('visibilitychange', handleLockScreen)
      return () => document.removeEventListener('visibilitychange', handleLockScreen)
    }
  }, [isAdmin])

  if (isAdmin) return <AdminRsvp />

  return (
    <div className="min-h-screen bg-cream font-elle">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      
      {!isOpened ? (
        /* Kirim handleOpen ke komponen Opening */
        <Opening onOpen={handleOpen} />
      ) : (
        <>
          <main>
            <Hero />
            <Couple />
            <LoveStory />
            <Countdown />
            {/* 🔥 SEKARANG DATA GUEST DIKIRIM KE EVENTS AGAR JAM KLOTER MUNCUL */}
            <Events guest={guest} /> 
            <Gallery />
            <RSVP />
            <Wishes />
            <Footer />
          </main>
          <MusicPlayer audioRef={audioRef} />
        </>
      )}
    </div>
  )
}

export default App