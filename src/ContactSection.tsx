const MAPS_QUERY = 'Radiance by Hotel Roopa, Mangalore, Karnataka'
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`

function InstagramIcon() {
  return (
    <svg className="contact__social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="contact__social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.6 20V12.6H15.8L16.1 10H13.6V8.4C13.6 7.68 13.8 7.2 14.85 7.2H16.2V4.86C15.96 4.83 15.16 4.76 14.22 4.76C12.27 4.76 10.93 5.94 10.93 8.16V10H8.7V12.6H10.93V20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg className="contact__social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4.5a7.5 7.5 0 0 0-6.4 11.4L4.5 19.5l3.7-1.05A7.5 7.5 0 1 0 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 9.6c.2-.5.4-.5.6-.5h.5c.15 0 .35 0 .5.4.2.5.6 1.5.65 1.6.05.1.08.22.02.35-.06.13-.1.2-.2.32-.1.12-.2.2-.3.33-.1.13-.2.25-.08.5.13.25.55 1 1.2 1.6.8.75 1.5 1 1.75 1.1.25.1.4.1.55-.05.15-.15.6-.65.75-.9.15-.25.3-.2.5-.12.2.08 1.3.6 1.5.7.2.1.35.15.4.25.05.1.05.55-.15 1.1-.2.5-1.15 1-1.6 1.05-.4.05-.95.1-3.05-.65-2.6-1-4.2-3.6-4.35-3.8-.15-.2-1.15-1.55-1.15-2.95 0-1.4.7-2.05.95-2.35Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg className="contact__social-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.6 15 12l-4.5 2.4V9.6Z" fill="currentColor" />
    </svg>
  )
}

export function ContactSection() {
  return (
    <section className="contact">
      <div className="contact__map">
        <iframe
          className="contact__map-frame"
          src={MAPS_EMBED_SRC}
          title="Radiance by Hotel Roopa location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="contact__panel">
        <div className="contact__panel-inner">
          <h2 className="contact__title">Radiance by Hotel Roopa</h2>

          <address className="contact__address">
            Hotel Roopa Building, Balmatta Road,
            <br />
            Hampankatta, Mangaluru,
            <br />
            Karnataka 575001
          </address>

          <a
            className="contact__btn contact__btn--outline"
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
          >
            Open In Google Maps
            <span className="contact__btn-arrow">→</span>
          </a>

          <div className="contact__details">
            <a className="contact__detail-link" href="#">
              Add email address
            </a>
            <a className="contact__detail-link" href="#">
              Add phone number
            </a>
          </div>

          <a
            className="contact__btn contact__btn--solid"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            Message Us On WhatsApp
            <span className="contact__btn-arrow">→</span>
          </a>

          <div className="contact__socials">
            <a href="#" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube">
              <YoutubeIcon />
            </a>
            <a href="#" aria-label="WhatsApp">
              <WhatsappIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
