import { motion } from 'framer-motion'
import { useState } from 'react'
import { themes } from '../data/book'

export function ThemesSection() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="themes" className="section themes">
      <motion.p
        className="section__label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The novel
      </motion.p>
      <motion.h2
        className="section__heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Themes
      </motion.h2>

      <motion.div
        className="themes__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {themes.map((theme) => (
          <motion.article
            key={theme.id}
            className={`theme-card${flipped[theme.id] ? ' theme-card--flipped' : ''}`}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0 },
            }}
            onClick={() => toggle(theme.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggle(theme.id)
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={flipped[theme.id] ?? false}
          >
            <div className="theme-card__inner">
              <div className="theme-card__face theme-card__face--front">
                <span className="theme-card__icon" aria-hidden="true">
                  {theme.icon}
                </span>
                <h3>{theme.title}</h3>
                <p className="theme-card__telugu" lang="te">
                  {theme.titleTelugu}
                </p>
                <p className="theme-card__hint">Tap to read more</p>
              </div>
              <div className="theme-card__face theme-card__face--back">
                <p>{theme.description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}