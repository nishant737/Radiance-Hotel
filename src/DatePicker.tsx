import { useEffect, useRef, useState } from 'react'

interface DatePickerProps {
  label: string
  value: string
  min: string
  onChange: (value: string) => void
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const pad = (n: number) => String(n).padStart(2, '0')
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const parse = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m: m - 1, d }
}
const display = (iso: string) => {
  const { y, m, d } = parse(iso)
  return `${d} ${MONTHS[m].slice(0, 3)} ${y}`
}

export function DatePicker({ label, value, min, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const anchor = value || min
  const [view, setView] = useState(() => {
    const { y, m } = parse(anchor)
    return { y, m }
  })
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () => {
    if (!open) {
      const { y, m } = parse(anchor)
      setView({ y, m })
    }
    setOpen(!open)
  }

  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1)
    setView({ y: d.getFullYear(), m: d.getMonth() })
  }

  const firstWeekday = new Date(view.y, view.m, 1).getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length < 42) cells.push(null)
  const minParts = parse(min)
  const canGoPrev = view.y > minParts.y || (view.y === minParts.y && view.m > minParts.m)

  return (
    <div className="hero__booking-field hero__date" ref={rootRef}>
      <span>{label}</span>
      <button
        type="button"
        className={`hero__date-btn${value ? '' : ' hero__date-btn--empty'}`}
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {value ? display(value) : 'Add date'}
      </button>

      {open && (
        <div className="hero__calendar" role="dialog" aria-label={`Choose ${label} date`}>
          <div className="hero__calendar-head">
            <button
              type="button"
              className="hero__calendar-nav"
              onClick={() => shift(-1)}
              disabled={!canGoPrev}
              aria-label="Previous month"
            >
              ‹
            </button>
            <div className="hero__calendar-title">
              {MONTHS[view.m]} {view.y}
            </div>
            <button
              type="button"
              className="hero__calendar-nav"
              onClick={() => shift(1)}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
          <div className="hero__calendar-grid">
            {WEEKDAYS.map((w) => (
              <div key={w} className="hero__calendar-weekday">
                {w}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={`e${i}`} className="hero__calendar-empty" />
              const iso = toISO(view.y, view.m, day)
              const disabled = iso < min
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  className={`hero__calendar-day${iso === value ? ' hero__calendar-day--selected' : ''}`}
                  onClick={() => {
                    onChange(iso)
                    setOpen(false)
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
