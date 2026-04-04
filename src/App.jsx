import { useState } from 'react'
import Opening from './components/Opening'
import Hero from './components/Hero'
import Couple from './components/Couple'
import LoveStory from './components/LoveStory'
import Countdown from './components/Countdown'
import Events from './components/Events'
import Gallery from './components/Gallery'
import RSVP from './components/Rsvp'
import Wishes from './components/Wishes'

function App() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className="min-h-screen bg-cream font-elle">
      {!isOpened ? (
        <Opening onOpen={() => setIsOpened(true)} />
      ) : (
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
      )}
    </div>
  )
}

export default App