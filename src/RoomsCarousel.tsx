import { useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion'

interface Room {
  name: string
}

interface RoomsCarouselProps {
  rooms: Room[]
}

const AUTO_SPEED = 40 // px per second
const RESUME_DELAY = 900 // ms after manual nav before auto-scroll resumes
const FALLBACK_STEP = 262 // card width (230) + gap (32)

export function RoomsCarousel({ rooms }: RoomsCarouselProps) {
  const groupRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const paused = useRef(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout>>()

  useAnimationFrame((_, delta) => {
    if (paused.current) return
    const groupWidth = groupRef.current?.scrollWidth ?? 0
    if (!groupWidth) return
    let next = x.get() - (AUTO_SPEED * delta) / 1000
    if (next <= -groupWidth) next += groupWidth
    x.set(next)
  })

  const slide = (direction: 1 | -1) => {
    const groupWidth = groupRef.current?.scrollWidth ?? 0
    if (!groupWidth) return
    const card = groupRef.current?.querySelector<HTMLElement>('.rooms__card')
    const step = card ? card.offsetWidth + 32 : FALLBACK_STEP

    paused.current = true
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)

    const target = x.get() - direction * step
    animate(x, target, {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => {
        let normalized = target
        while (normalized <= -groupWidth) normalized += groupWidth
        while (normalized > 0) normalized -= groupWidth
        x.set(normalized)
        resumeTimeout.current = setTimeout(() => {
          paused.current = false
          resumeTimeout.current = undefined
        }, RESUME_DELAY)
      },
    })
  }

  return (
    <div
      className="rooms__carousel"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => {
        if (!resumeTimeout.current) paused.current = false
      }}
    >
      <motion.div className="rooms__track" style={{ x }}>
        {[0, 1, 2, 3].map((groupIndex) => (
          <div
            className="rooms__group"
            key={groupIndex}
            aria-hidden={groupIndex !== 0}
            ref={groupIndex === 0 ? groupRef : undefined}
          >
            {rooms.map((room, i) => (
              <div
                key={`${groupIndex}-${room.name}-${i}`}
                className={`rooms__card rooms__card--pos${i}`}
              >
                <div className="rooms__card-image">
                  <span className="rooms__card-placeholder">Room Photo</span>
                  <div className="rooms__card-scrim" />
                  <button type="button" className="rooms__card-more">
                    Show More
                  </button>
                </div>
                <p className="rooms__card-name">{room.name}</p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      <div className="rooms__nav">
        <button
          type="button"
          className="rooms__nav-btn"
          aria-label="Previous rooms"
          onClick={() => slide(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="rooms__nav-btn"
          aria-label="Next rooms"
          onClick={() => slide(1)}
        >
          ›
        </button>
      </div>
    </div>
  )
}
