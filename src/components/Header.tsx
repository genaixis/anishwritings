import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { navLinks, publisher } from '../data/book'

type HeaderProps = {
  onBuy: () => void
}

export function Header({ onBuy }: HeaderProps) {
  const { scrollY } = useScroll()
  const backdrop = useTransform(scrollY, [0, 80], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.4])
  const borderColor = useMotionTemplate`rgba(245, 239, 230, ${borderOpacity})`

  return (
    <motion.header className="site-header">
      <motion.div
        className="site-header__backdrop"
        style={{ opacity: backdrop, borderColor }}
      />
      <motion.div
        className="site-header__inner"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#" className="logo">
          <span className="logo__mark" aria-hidden="true" />
          <span className="logo__text">{publisher.displayName}</span>
        </a>
        <nav className="nav" aria-label="Primary">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        <motion.button
          type="button"
          className="btn btn--header"
          onClick={onBuy}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Buy the book
        </motion.button>
      </motion.div>
    </motion.header>
  )
}