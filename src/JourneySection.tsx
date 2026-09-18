import radianceLogoImg from './assets/named.webp'

interface JourneyItem {
  label: string
}

const journeyItems: JourneyItem[] = [
  { label: 'Rooms' },
  { label: 'Dining' },
  { label: 'Rooftop' },
]

export function JourneySection() {
  return (
    <section className="journey">
      <div className="journey__media">
        <img src={radianceLogoImg} alt="Radiance by Hotel Roopa" />
      </div>

      <div className="journey__content">
        <p className="journey__eyebrow">The Radiance Experience</p>
        <h2 className="journey__heading">
          Every corner designed to make you feel at ease, from the room to
          the rooftop.
        </h2>

        <ul className="journey__list">
          {journeyItems.map((item) => (
            <li key={item.label} className="journey__item">
              {item.label}
            </li>
          ))}
        </ul>

        <button type="button" className="journey__cta">
          More About The Hotel
          <span className="journey__cta-arrow">→</span>
        </button>
      </div>
    </section>
  )
}
