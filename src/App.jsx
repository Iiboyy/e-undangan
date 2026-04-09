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
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [isOpened, setIsOpened] = useState(false)
  const audioRef = useRef(null)

  const handleOpen = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction")
      })
    }
    setIsOpened(true)
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return
      
      if (document.hidden) {
        if (!audioRef.current.paused) {
          audioRef.current.pause()
        }
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Cannot resume audio:", error)
          })
        }
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
  }, [])

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile && audioRef.current) {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => {
          audioRef.current?.play()
        })
        navigator.mediaSession.setActionHandler('pause', () => {
          audioRef.current?.pause()
        })
      }
      
      const handleLockScreen = () => {
        if (document.hidden && !audioRef.current.paused) {
          audioRef.current.pause()
        }
      }
      
      document.addEventListener('visibilitychange', handleLockScreen)
      return () => document.removeEventListener('visibilitychange', handleLockScreen)
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream font-elle">
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
          <MusicPlayer audioRef={audioRef} />
        </>
      )}
    </div>
  )
}

export default App