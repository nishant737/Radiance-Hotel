import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface RevealWordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

function RevealWord({ children, progress, range }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.3, 1])
  return (
    <motion.span className="reveal-word" style={{ opacity }}>
      {children}
    </motion.span>
  )
}

interface RevealParagraphProps {
  text: string
  className?: string
}

export function RevealParagraph({ text, className }: RevealParagraphProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const words = text.split(' ')
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.25'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 50,
    mass: 0.5,
  })

  return (
    <p className={className} ref={containerRef}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <span key={`${word}-${i}`}>
            <RevealWord progress={smoothProgress} range={[start, end]}>
              {word}
            </RevealWord>{' '}
          </span>
        )
      })}
    </p>
  )
}
