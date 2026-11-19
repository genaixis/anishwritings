import type { PointerEvent } from 'react'
import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { book, gallery } from '../data/book'
import { useCoarsePointer } from '../hooks/useCoarsePointer'

function GalleryTile({
  item,
  index,
}: {
  item: (typeof gallery)[number]
  index: number
}) {
  const coarse = useCoarsePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (coarse) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const [src, setSrc] = useState<string>(item.src)

  return (
    <motion.figure
      className={`gallery__item gallery__item--${item.span}`}
      style={coarse ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: coarse ? 16 : 28, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <div className="gallery__frame">
        <img
          src={src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          onError={() => setSrc(book.coverLocal)}
        />
        {!coarse && (
          <motion.div
            className="gallery__sheen"
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          />
        )}
      </div>
      <figcaption>{item.caption}</figcaption>
    </motion.figure>
  )
}

export function GallerySection() {
  return (
    <section id="gallery" className="section gallery">
      <motion.p className="section__label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        {book.titleLatin}
      </motion.p>
      <motion.h2
        className="section__heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Gallery
      </motion.h2>

      <div className="gallery__mosaic">
        {gallery.map((item, index) => (
          <GalleryTile key={item.caption} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}