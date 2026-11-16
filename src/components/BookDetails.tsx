import { motion } from 'framer-motion'
import { book } from '../data/book'

const specs = [
  { label: 'Title', value: book.titleLatin },
  { label: 'Publisher', value: 'anishwritings' },
  { label: 'Publication year', value: String(book.year) },
  { label: 'Edition', value: book.edition },
  { label: 'ISBN-13', value: book.isbn },
  { label: 'Language', value: book.language },
  { label: 'Genre', value: book.genre },
]

export function BookDetails({ onBuy }: { onBuy: () => void }) {
  return (
    <section id="book" className="section book-section">
      <motion.h2
        className="section__heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        The Book
      </motion.h2>

      <div className="book-section__grid">
        <motion.ul
          className="spec-list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {specs.map((row) => (
            <motion.li
              key={row.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="book-card"
          initial={{ opacity: 0, rotateY: -8 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="book-card__shine" aria-hidden="true" />
          <img src={book.coverUrl} alt="" loading="lazy" />
          <motion.div
            className="price-tag"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="price-tag__mrp">₹{book.mrpInr}</span>
            <span className="price-tag__now">₹{book.priceInr}</span>
          </motion.div>
          <p className="book-card__format">{book.format}</p>
          <button type="button" className="btn btn--primary btn--block" onClick={onBuy}>
            Buy on Flipkart
          </button>
        </motion.div>
      </div>
    </section>
  )
}