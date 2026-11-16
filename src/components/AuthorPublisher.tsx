import { motion } from 'framer-motion'
import { book, publisher } from '../data/book'

export function AuthorPublisher() {
  return (
  <>
    <section id="author" className="section author">
      <motion.div
        className="author__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="author__initials"
          aria-hidden="true"
          animate={{ boxShadow: ['0 0 0 rgba(201,162,39,0)', '0 0 48px rgba(201,162,39,0.25)', '0 0 0 rgba(201,162,39,0)'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          AB
        </motion.span>
        <div>
          <p className="section__label">Author</p>
          <h2 className="section__heading section__heading--sm">{book.author}</h2>
          <p className="author__bio">
            Anish Babu Kosuru writes Telugu fiction that treats love as lived experience—tender,
            challenging, and woven into the bonds of family. <em>Janaki Chenthaku Ram</em> is his
            debut hardcover from {publisher.displayName}.
          </p>
        </div>
      </motion.div>
    </section>

    <section id="publisher" className="section publisher">
      <motion.div
        className="publisher__panel"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="section__label">Publisher</p>
        <h2 className="publisher__name">{publisher.displayName}</h2>
        <p className="publisher__tagline">{publisher.tagline}</p>
        <ul className="publisher__facts">
          <li>Independent publishing · {publisher.country}</li>
          <li>Maker: Anish Writings</li>
          <li>Available on Flipkart</li>
        </ul>
        <motion.a
          href="https://anishwritings.com"
          className="publisher__domain"
          whileHover={{ color: 'var(--gold)' }}
        >
          anishwritings.com
        </motion.a>
      </motion.div>
    </section>
  </>
  )
}