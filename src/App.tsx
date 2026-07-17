import { useState } from 'react'
import logo from './assets/logo-white.png'
import heroVideo from './assets/radianceherosection.mp4'
import './App.css'

const navLinks = ['Rooms', 'The Hotel', 'Dining', 'Gallery', 'Offers']

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

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
    <section className="hero">
      <video
        className="hero__video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__overlay" />

      <header className="hero__nav">
        <nav className="hero__nav-left">
          {navLinks.map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </nav>
        <nav className="hero__nav-right">
          <a href="#">Contact</a>
          <button type="button" className="hero__menu-btn">
            Menu
            <span className="hero__menu-icon">
              <span />
              <span />
            </span>
          </button>
        </nav>
      </header>

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
          <label className="hero__booking-field">
            <span>Check-in</span>
            <input type="text" placeholder="Add date" />
          </label>
          <label className="hero__booking-field">
            <span>Check-out</span>
            <input type="text" placeholder="Add date" />
          </label>
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
    </section>
  )
}

export default App
