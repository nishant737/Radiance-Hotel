import logo from './assets/logo-white.png'
import heroVideo from './assets/radianceherosection.mp4'
import './App.css'

const navLinks = ['Rooms', 'The Hotel', 'Dining', 'Gallery', 'Offers']

function App() {
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

      <form className="hero__booking" onSubmit={(e) => e.preventDefault()}>
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
        <button type="submit" className="hero__booking-submit">
          Reserve
        </button>
      </form>
    </section>
  )
}

export default App
