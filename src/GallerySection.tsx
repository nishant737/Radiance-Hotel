import { useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion'
import deluxeRoomImg from './assets/Deluxeroom.jpg'
import summerSuiteImg from './assets/Summersuite.jpg'
import executiveSuiteImg from './assets/Executivesuite.jpg'
import premiumSuiteImg from './assets/Premimumsuite.jpg'
import familySuiteImg from './assets/Familysuite.jpg'
import radianceTourVideo from './assets/RadianceHotelTour.mp4'
import radianceWelcomeVideo from './assets/3radiance.mp4'

interface GalleryItem {
  category: string
  title: string
  image?: string
  video?: string
}

const galleryItems: GalleryItem[] = [
  { category: 'Video', title: 'A Stay Worth Remembering', video: radianceTourVideo },
  { category: 'Experience', title: 'From Warm Welcomes To Everyday Comforts', video: radianceWelcomeVideo },
  { category: 'Rooms', title: 'Deluxe Room: Comfort Refined For Every Stay', image: deluxeRoomImg },
  { category: 'Suites', title: 'Executive Suite: Space And Style For Business Stays', image: executiveSuiteImg },
  { category: 'Family', title: 'Family Suite: Room To Relax, Together', image: familySuiteImg },
  { category: 'Luxury', title: 'Premium Suite: Indulgent Comfort, Elevated Living', image: premiumSuiteImg },
  { category: 'Suites', title: 'Summer Suite: Bright, Airy, Effortlessly Elegant', image: summerSuiteImg },
]

const AUTO_SPEED = 40 // px per second
const RESUME_DELAY = 900 // ms after manual nav before auto-scroll resumes
const FALLBACK_STEP = 448 // card width (420) + gap (28)

export function GallerySection() {
  const groupRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const paused = useRef(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

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
    const card = groupRef.current?.querySelector<HTMLElement>('.gallery__card')
    const step = card ? card.offsetWidth + 28 : FALLBACK_STEP

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
    <section className="gallery">
      <div className="gallery__header">
        <div className="gallery__heading-block">
          <p className="gallery__eyebrow">Gallery</p>
          <h2 className="gallery__heading">
            A closer look at the rooms, spaces and details that define every
            stay at Radiance.
          </h2>
        </div>
        <button type="button" className="gallery__cta">
          See More Gallery
          <span className="gallery__cta-arrow">→</span>
        </button>
      </div>

      <div
        className="gallery__track"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <motion.div className="gallery__slider" style={{ x }}>
          {[0, 1, 2, 3].map((groupIndex) => (
            <div
              className="gallery__group"
              key={groupIndex}
              aria-hidden={groupIndex !== 0}
              ref={groupIndex === 0 ? groupRef : undefined}
            >
              {galleryItems.map((item, i) => (
                <div className="gallery__card" key={`${groupIndex}-${item.title}-${i}`}>
                  {item.video ? (
                    <video
                      className="gallery__card-img"
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      ref={(el) => {
                        el?.play().catch(() => {})
                      }}
                    />
                  ) : (
                    <img
                      className="gallery__card-img"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                  )}
                  <div className="gallery__card-scrim" />
                  <p className="gallery__card-category">{item.category}</p>
                  <h3 className="gallery__card-title">{item.title}</h3>
                  <button type="button" className="gallery__card-btn">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="gallery__nav">
        <button
          type="button"
          className="gallery__nav-btn"
          aria-label="Previous gallery items"
          onClick={() => slide(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="gallery__nav-btn"
          aria-label="Next gallery items"
          onClick={() => slide(1)}
        >
          ›
        </button>
      </div>
    </section>
  )
}
