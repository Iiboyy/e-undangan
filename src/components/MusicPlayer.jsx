import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function MusicPlayer({ audioRef }) {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [noteIdx, setNoteIdx] = useState(0)
  const playerRef = useRef(null)

  const noteVariants = ['♩', '♪', '♫', '♬']

  useEffect(() => {
    gsap.fromTo(playerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1.5, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return

      if (document.hidden) {
        if (isPlaying && !isMuted) {
          audioRef.current.pause()
        }
      } else {
        if (isPlaying && !isMuted) {
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Autoplay prevented:", error)
              setIsPlaying(false)
            })
          }
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
  }, [isPlaying, isMuted])

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log("User interaction required for audio:", error)
        }
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    if (isPlaying && audioRef.current && audioRef.current.paused) {
      document.addEventListener('click', handleFirstInteraction)
      document.addEventListener('touchstart', handleFirstInteraction)
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  useEffect(() => {
    if (!isPlaying || isMuted) return
    const interval = setInterval(() => {
      setNoteIdx(i => (i + 1) % noteVariants.length)
    }, 800)
    return () => clearInterval(interval)
  }, [isPlaying, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Play failed:", error)
        })
      }
    }
    setIsPlaying(prev => !prev)
  }

  const toggleMute = () => setIsMuted(prev => !prev)

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (val > 0 && isMuted) setIsMuted(false)
    if (val === 0) setIsMuted(true)
  }

  return (
    <div
      ref={playerRef}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      style={{ opacity: 0 }}
    >

      {/* ── Panel expand (kiri) ── */}
      <div
        className={`
          flex items-center gap-3 overflow-hidden
          bg-sage-dark/90 backdrop-blur-md border border-gold/20 rounded-full
          transition-all duration-500 ease-in-out
          ${isExpanded
            ? 'opacity-100 px-4 py-2.5 max-w-xs pointer-events-auto'
            : 'opacity-0 px-0 py-2.5 max-w-0 pointer-events-none'
          }
        `}
      >
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="text-cream/70 hover:text-gold transition-colors duration-300 flex items-center justify-center w-6 h-6 shrink-0"
        >
          {isPlaying ? (
            <span className="flex gap-[3px] items-center">
              <span className="w-[3px] h-3 bg-current rounded-full" />
              <span className="w-[3px] h-3 bg-current rounded-full" />
            </span>
          ) : (
            <span
              className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px]"
              style={{ borderLeftColor: 'currentColor' }}
            />
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-gold/20 shrink-0" />

        {/* Mute */}
        <button
          onClick={toggleMute}
          className="text-cream/70 hover:text-gold transition-colors duration-300 shrink-0"
        >
          {isMuted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        {/* Volume slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolume}
          className="w-20 h-0.5 rounded-full outline-none cursor-pointer appearance-none shrink-0"
          style={{
            background: `linear-gradient(to right, #C9A84C ${(isMuted ? 0 : volume) * 100}%, rgba(201,168,76,0.2) ${(isMuted ? 0 : volume) * 100}%)`
          }}
        />

        {/* Label */}
        <p className="font-cormorant text-gold text-xs italic whitespace-nowrap shrink-0">
          Chelsea & Ranu
        </p>
      </div>

      {/* ── Tombol utama ── */}
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className={`
          relative w-11 h-11 rounded-full flex items-center justify-center shrink-0
          bg-sage-dark/90 backdrop-blur-md border transition-all duration-500 cursor-pointer
          ${isExpanded ? 'border-gold/60 shadow-lg shadow-gold/10' : 'border-gold/20 hover:border-gold/50'}
        `}
      >
        {/* Ring ping saat playing */}
        {isPlaying && !isMuted && (
          <>
            <span className="absolute inset-0 rounded-full border border-gold/20 animate-ping" style={{ animationDuration: '2s' }} />
            <span className="absolute inset-[-4px] rounded-full border border-gold/10 animate-ping" style={{ animationDuration: '2.8s', animationDelay: '0.6s' }} />
          </>
        )}

        {/* Note icon */}
        <span className={`font-cormorant text-lg select-none transition-colors duration-300 ${isMuted ? 'text-cream/30' : 'text-gold'}`}>
          {isPlaying && !isMuted ? noteVariants[noteIdx] : '♪'}
        </span>
      </button>

    </div>
  )
}