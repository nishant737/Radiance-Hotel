import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import roopaImg from './assets/roopa.png'

interface JourneyItem {
  label: string
}

const journeyItems: JourneyItem[] = [
  { label: 'Rooms' },
  { label: 'Dining' },
  { label: 'Rooftop' },
]

const THUMB_HEIGHT = 340

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [thumbTop, setThumbTop] = useState<number | null>(null)

  useLayoutEffect(() => {
    const listEl = listRef.current
    const sectionEl = sectionRef.current
    if (!listEl || !sectionEl) return

    const measure = () => {
      const listRect = listEl.getBoundingClientRect()
      const sectionRect = sectionEl.getBoundingClientRect()
      setThumbTop(listRect.top - sectionRect.top + listRect.height / 2)
    }

    measure()
    window.addEventListener('resize', measure)

    // Re-measure once web fonts finish loading — a font swap can reflow
    // the eyebrow/heading text above the list, shifting its position
    // after our initial (pre-font) measurement.
    document.fonts?.ready.then(measure)

    // Catch any other layout shift affecting the list's position
    // (e.g. image load, late content changes).
    const observer = new ResizeObserver(measure)
    observer.observe(sectionEl)

    return () => {
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="journey" ref={sectionRef}>
      <div className="journey__media">
        <img src={roopaImg} alt="Hotel Radiance" />
      </div>

      <div className="journey__content" onMouseLeave={() => setActive(null)}>
        <p className="journey__eyebrow">The Radiance Experience</p>
        <h2 className="journey__heading">
          Every corner designed to make you feel at ease, from the room to
          the rooftop.
        </h2>

        <ul className="journey__list" ref={listRef}>
          {journeyItems.map((item, i) => (
            <li
              key={item.label}
              className={`journey__item${active === i ? ' journey__item--active' : ''}`}
              onMouseEnter={() => setActive(i)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <button type="button" className="journey__cta">
          More About The Hotel
          <span className="journey__cta-arrow">→</span>
        </button>
      </div>

      <motion.div
        className="journey__thumb"
        style={thumbTop !== null ? { top: thumbTop } : undefined}
        animate={{ opacity: active !== null ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden={active === null}
      >
        <motion.div
          className="journey__thumb-track"
          animate={{ y: -(active ?? 0) * THUMB_HEIGHT }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {journeyItems.map((item) => (
            <div className="journey__thumb-slide" key={item.label} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
