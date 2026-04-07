import { useRef, useState } from 'react'
import Opening from './components/Opening'
import Hero from './components/Hero'
import Couple from './components/Couple'
import LoveStory from './components/LoveStory'
import Countdown from './components/Countdown'
import Events from './components/Events'
import Gallery from './components/Gallery'
import RSVP from './components/Rsvp'
import Wishes from './components/Wishes'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [isOpened, setIsOpened] = useState(false)
  const audioRef = useRef(null)

  const handleOpen = () => {
    // Mulai musik begitu undangan dibuka
    // Browser butuh user gesture (klik) sebelum autoplay — sudah terpenuhi dari tombol "Buka Undangan"
    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {
        // Autoplay blocked — user bisa play manual dari MusicPlayer
      })
    }
    setIsOpened(true)
  }

  return (
    <div className="min-h-screen bg-cream font-elle">
      {/* Audio element — global & persistent */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />

      {!isOpened ? (
        <Opening onOpen={handleOpen} />
      ) : (
        <>
          <main>
            <Hero />
            <Couple />
            <LoveStory />
            <Countdown />
            <Events />
            <Gallery />
            <RSVP />
            <Wishes />
          </main>

          {/* Music player — floating fixed, selalu di atas semua section */}
          <MusicPlayer audioRef={audioRef} />
        </>
      )}
    </div>
  )
}

export default App