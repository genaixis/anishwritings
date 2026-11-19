import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { journeySteps } from '../data/book'

export function JourneySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1])

  return (
    <section ref={ref} className="section journey">
      <motion.h2
        className="section__heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The reader&apos;s journey
      </motion.h2>
      <p className="section__lede">
        Four movements through Janaki and Ram&apos;s world—from first glance to enduring love grounded in family.
      </p>

      <div className="journey__track">
          <motion.div className="journey__line" style={{ scaleY: lineScale }} />
          <ol className="journey__list">
            {journeySteps.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <span className="journey__step">{step.step}</span>
                <motion.div
                  className="journey__card"
                  whileHover={{ rotateY: 6, z: 12 }}
                  style={{ transformPerspective: 1000 }}
                >
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
      </div>
    </section>
  )
}