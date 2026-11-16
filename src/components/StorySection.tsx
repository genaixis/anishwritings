import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { book } from '../data/book'

const lines = [
  'A Telugu love story rooted in home, honour, and the quiet courage of everyday life.',
  'Janaki Chenthaku Ram explores how deep affection does not escape responsibility—it illuminates the path through it.',
  'Written for readers who believe romance and family duty can walk the same road, hand in hand.',
]

export function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3])

  return (
    <section id="story" className="section story" ref={ref}>
      <motion.div className="section__label" style={{ opacity }}>
        The Story
      </motion.div>
      <div className="story__layout">
        <motion.blockquote
          className="story__quote"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="story__quote-telugu">{book.titleTelugu}</p>
          <p className="story__quote-key">{book.tagline}</p>
        </motion.blockquote>

        <div className="story__prose">
          {lines.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}