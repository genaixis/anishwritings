import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import './App.css'
import { AmbientCanvas } from './components/AmbientCanvas'
import { AuthorPublisher } from './components/AuthorPublisher'
import { BookDetails } from './components/BookDetails'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PageLoader } from './components/PageLoader'
import { StorySection } from './components/StorySection'
import { GallerySection } from './components/GallerySection'
import { JourneySection } from './components/JourneySection'
import { ThemesSection } from './components/ThemesSection'
import { book } from './data/book'

const Experience3D = lazy(() =>
  import('./components/Experience3D').then((m) => ({ default: m.Experience3D })),
)

function App() {
  const [ready, setReady] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reduced ? 0 : 1200
    const id = window.setTimeout(() => {
      setReady(true)
      setShowLoader(false)
    }, delay)
    return () => window.clearTimeout(id)
  }, [])

  const openFlipkart = useCallback(() => {
    window.open(book.buyUrl, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {showLoader && <PageLoader key="loader" onDone={() => setShowLoader(false)} />}
      </AnimatePresence>

      {ready && (
        <>
          <AmbientCanvas />
          <Header onBuy={openFlipkart} />
          <main>
            <Hero onBuy={openFlipkart} />
            <StorySection />
            <ThemesSection />
            <GallerySection />
            <Suspense fallback={<div className="section experience-3d experience-3d--loading" aria-busy="true" />}>
              <Experience3D />
            </Suspense>
            <JourneySection />
            <BookDetails onBuy={openFlipkart} />
            <AuthorPublisher />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App