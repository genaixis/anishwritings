import type { PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { book, publisher } from '../data/book'
import { useCoarsePointer } from '../hooks/useCoarsePointer'

type HeroProps = {
  onBuy: () => void
}

export function Hero({ onBuy }: HeroProps) {
  const coarse = useCoarsePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 22,
  })

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (coarse) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const titleWords = book.titleLatin.split(' ')

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <motion.div
        className="hero__glow hero__glow--left"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero__glow hero__glow--right"
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="hero__grid">
        <div className="hero__copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.28em' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {publisher.name} · {book.year}
          </motion.p>

          <h1 id="hero-heading" className="hero__title-telugu">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {book.titleTelugu}
            </motion.span>
          </h1>

          <p className="hero__title-latin" lang="en">
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                className="hero__word"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35 + i * 0.1,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            {book.tagline}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.button
              type="button"
              className="btn btn--primary"
              onClick={onBuy}
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(201,162,39,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              Order on Flipkart · ₹{book.priceInr}
            </motion.button>
            <a href="#story" className="btn btn--ghost">
              Read about the story
            </a>
          </motion.div>

          <motion.dl
            className="hero__meta"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } },
            }}
          >
            {[
              ['Author', book.author],
              ['Genre', book.genre],
              ['Format', `${book.format} · ${book.language}`],
            ].map(([term, value]) => (
              <motion.div
                key={term}
                className="hero__meta-item"
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: { opacity: 1, x: 0 },
                }}
              >
                <dt>{term}</dt>
                <dd>{value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div
          className="hero__book-stage"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <motion.div
            className="hero__book-shadow"
            style={coarse ? undefined : { rotateX, rotateY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          />
          <motion.figure
            className="hero__book"
            style={coarse ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
            initial={{ opacity: 0, scale: coarse ? 1 : 0.88, rotateY: coarse ? 0 : -18 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__book-spine" aria-hidden="true" />
            <img
              src={book.coverLocal}
              alt={`Cover of ${book.titleLatin}, hardcover Telugu novel`}
              width={416}
              height={562}
              loading="eager"
              fetchPriority="high"
            />
            <figcaption className="visually-hidden">{book.titleLatin}</figcaption>
          </motion.figure>
          <motion.div
            className="hero__orbit"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4 },
          y: { duration: 2.2, repeat: Infinity },
        }}
      >
        <span>Scroll</span>
        <span className="scroll-cue__line" />
      </motion.div>
    </section>
  )
}