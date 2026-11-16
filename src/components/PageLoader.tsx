import { motion } from 'framer-motion'

export function PageLoader({ onDone: _onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="page-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="page-loader__brand"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        anishwritings
      </motion.p>
      <motion.div
        className="page-loader__bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}