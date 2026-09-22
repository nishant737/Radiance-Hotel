import { useState } from 'react'
import { motion } from 'framer-motion'
import logo from './assets/logo-white.png'
import heroVideo from './assets/radianceherosection.mp4'
import roopaImg from './assets/about.jpeg'
import superiorKingImg from './assets/rooms/web/SuperiorKing.jpg'
import superiorQueenImg from './assets/rooms/web/SuperiorQueen.jpg'
import superiorTwinImg from './assets/rooms/web/SuperiorTwin.jpg'
import premiereKingImg from './assets/rooms/web/PremiereKing.jpg'
import premiereQueenImg from './assets/rooms/web/PremiereQueen.jpg'
import premiereTwinImg from './assets/rooms/web/PremiereTwin.jpg'
import juniorSuiteImg from './assets/rooms/web/JuniorSuite.jpg'
import executiveSuiteImg from './assets/rooms/web/ExecutiveSuite.jpg'
import presidentialSuiteImg from './assets/rooms/web/PresidentialSuite.jpg'
import { RevealParagraph } from './RevealText'
import { RoomsCarousel } from './RoomsCarousel'
import { JourneySection } from './JourneySection'
import { ExploreSection } from './ExploreSection'
import { GallerySection } from './GallerySection'
import { ContactSection } from './ContactSection'
import { DatePicker } from './DatePicker'
import './App.css'

const promoItems = [
  'Best Price Guaranteed',
  'Free Cancellation 48H',
  'Free Late Check-out (Subject to Availability)',
]

const roopaParagraphs = [
  "At Radiance Hotel, Mangalore, sophistication blends seamlessly with timeless hospitality to create an exceptional stay experience. Nestled in the heart of the city, the hotel offers elegantly designed interiors, warm personalized service, and thoughtfully curated comforts that cater to both business and leisure travelers. Every room is thoughtfully appointed with modern amenities, ensuring the perfect balance of comfort, convenience, and style. Guests can indulge in delightful dining experiences, versatile event spaces, and attentive hospitality that reflects the true spirit of Mangalore. Whether you're visiting for a corporate meeting, a family vacation, or a weekend getaway, every detail is carefully crafted to provide a relaxing, memorable, and truly enriching stay. At Radiance Hotel, every moment is designed to make you feel welcomed, valued, and at home.",
]

const roomCards = [
  { name: 'Superior King', image: superiorKingImg },
  { name: 'Superior Queen', image: superiorQueenImg },
  { name: 'Superior Twin', image: superiorTwinImg },
  { name: 'Premiere King', image: premiereKingImg },
  { name: 'Premiere Queen', image: premiereQueenImg },
  { name: 'Premiere Twin', image: premiereTwinImg },
  { name: 'Junior Suite', image: juniorSuiteImg },
  { name: 'Executive Suite', image: executiveSuiteImg },
  { name: 'Presidential Suite', image: presidentialSuiteImg },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const today = new Date().toISOString().slice(0, 10)


  const handleReserveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isBookingOpen && window.matchMedia('(max-width: 700px)').matches) {
      e.preventDefault()
      setIsBookingOpen(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBookingOpen(false)
  }

  return (
    <>
      <section className="hero">
        <video
          className="hero__video"
          src={heroVideo}
          poster="/hero-poster.jpg"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero__overlay" />

        <div className="hero__content">
          <img src={logo} className="hero__logo" alt="Radiance by Hotel Roopa" />
        </div>

        {isBookingOpen && (
          <div
            className="hero__booking-backdrop"
            onClick={() => setIsBookingOpen(false)}
          />
        )}

        <form
          className={`hero__booking${isBookingOpen ? ' hero__booking--open' : ''}`}
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="hero__booking-close"
            onClick={() => setIsBookingOpen(false)}
            aria-label="Close booking form"
          >
            ×
          </button>
          <div className="hero__booking-fields">
            <DatePicker
              label="Check-in"
              value={checkIn}
              min={today}
              onChange={(v) => {
                setCheckIn(v)
                if (checkOut && v >= checkOut) setCheckOut('')
              }}
            />
            <DatePicker
              label="Check-out"
              value={checkOut}
              min={checkIn || today}
              onChange={setCheckOut}
            />
            <label className="hero__booking-field">
              <span>Guests</span>
              <input type="text" placeholder="Add guests" />
            </label>
          </div>
          <button
            type="submit"
            className="hero__booking-submit"
            onClick={handleReserveClick}
          >
            Reserve
          </button>
        </form>

        <div className="hero__booking-badge" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="hero__booking-badge-ring">
            <defs>
              <path
                id="booking-badge-circle"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="hero__booking-badge-text">
              <textPath href="#booking-badge-circle" startOffset="0%">
                BOOK NOW • BOOK NOW • BOOK NOW •
              </textPath>
            </text>
          </svg>
          <span className="hero__booking-badge-arrow">→</span>
        </div>
      </section>

      <section className="promo-marquee">
        <div className="promo-marquee__track">
          {[0, 1].map((groupIndex) => (
            <div
              className="promo-marquee__group"
              key={groupIndex}
              aria-hidden={groupIndex === 1}
            >
              {promoItems.map((item) => (
                <span className="promo-marquee__item" key={item}>
                  <span className="promo-marquee__dot" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="roopa">
        <img
          src={roopaImg}
          className="roopa__image"
          alt=""
          aria-hidden="true"
        />
        <div className="roopa__scrim" />
        <div className="roopa__content">
          <motion.h2
            className="roopa__heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            Hotel Radiance
          </motion.h2>
          {roopaParagraphs.map((text, i) => (
            <RevealParagraph key={i} className="roopa__text" text={text} />
          ))}
        </div>
      </section>

      <section className="rooms">
        <motion.h2
          className="rooms__heading"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          Rooms designed for comfort,
          <br />
          crafted for quiet luxury
        </motion.h2>

        <RoomsCarousel rooms={roomCards} />
      </section>

      <JourneySection />

      <ExploreSection />

      <GallerySection />

      <ContactSection />
    </>
  )
}

export default App
