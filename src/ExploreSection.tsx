import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface ExplorePhoto {
  label: string
  top: string
  left: string
  rotate: number
  width: number
  travel: number
  range: [number, number]
}

const explorePhotos: ExplorePhoto[] = [
  { label: 'Panambur Beach', top: '3%', left: '72%', rotate: -6, width: 145, travel: 1300, range: [0, 1] },
  { label: 'Kadri Manjunath Temple', top: '12%', left: '14%', rotate: 5, width: 125, travel: 1380, range: [0, 1] },
  { label: 'Pilikula Nisargadhama', top: '33%', left: '82%', rotate: 4, width: 130, travel: 1450, range: [0, 1] },
  { label: 'St. Aloysius Chapel', top: '35%', left: '6%', rotate: -4, width: 125, travel: 1480, range: [0, 1] },
  { label: 'Tannirbhavi Beach', top: '64%', left: '68%', rotate: -8, width: 115, travel: 1220, range: [0, 1] },
  { label: 'Sultan Battery', top: '65%', left: '18%', rotate: 6, width: 110, travel: 1300, range: [0, 1] },
]

interface ExplorePhotoCardProps {
  photo: ExplorePhoto
  progress: MotionValue<number>
}

function ExplorePhotoCard({ photo, progress }: ExplorePhotoCardProps) {
  const x = useTransform(progress, photo.range, [photo.travel, -photo.travel])

  return (
    <motion.div
      className="explore__photo"
      style={{
        top: photo.top,
        left: photo.left,
        width: photo.width,
        rotate: photo.rotate,
        x,
      }}
    >
      <span className="explore__photo-label">{photo.label}</span>
    </motion.div>
  )
}

function InstagramIcon() {
  return (
    <svg
      className="explore__cta-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function ExploreSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  })

  return (
    <section className="explore" ref={sectionRef}>
      <div className="explore__sticky">
        <div className="explore__photos">
          {explorePhotos.map((photo) => (
            <ExplorePhotoCard key={photo.label} photo={photo} progress={smoothProgress} />
          ))}
        </div>

        <div className="explore__content">
          <p className="explore__heading">
            Mangalore is a feeling. Discover the coastal moments that make
            every stay unforgettable.
          </p>
          <button type="button" className="explore__cta">
            <InstagramIcon />
            Mangalore Offers
          </button>
        </div>
      </div>
    </section>
  )
}
