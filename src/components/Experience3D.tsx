import { motion } from 'framer-motion'
import { book, productHighlights } from '../data/book'
import { Scene3D } from './three/Scene3D'

export function Experience3D() {
  return (
    <section id="experience" className="section experience-3d" aria-label={book.titleLatin}>
      <motion.div
        className="experience-3d__stage"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Scene3D />
        <div className="experience-3d__badge">
          <span lang="te">{book.titleTelugu}</span>
          <small>
            {book.format} · {book.year}
          </small>
        </div>
      </motion.div>

      <motion.ul
        className="highlight-chips"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {productHighlights.map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, scale: 0.92 },
              show: { opacity: 1, scale: 1 },
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}