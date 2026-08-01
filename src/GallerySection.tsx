import { useState } from 'react'

interface GalleryItem {
  category: string
  title: string
  rotate: number
}

const galleryItems: GalleryItem[] = [
  { category: 'Dining', title: 'Mangalore Flavours: A Coastal Feast Worth Savouring', rotate: -3 },
  { category: 'Day Trip', title: 'Kadri Hills: A Quiet Escape Minutes From The Hotel', rotate: 3 },
  { category: 'Experience', title: "Sunset By The Arabian Sea At Panambur Beach", rotate: -4 },
  { category: 'Day Trip', title: 'Pilikula Nisargadhama: Nature At Your Doorstep', rotate: 4 },
  { category: 'Mangalore', title: 'Discover Mangalore: The Jewel Of Coastal Karnataka', rotate: -2 },
]

export function GallerySection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="gallery">
      <div className="gallery__header">
        <div className="gallery__heading-block">
          <p className="gallery__eyebrow">Gallery</p>
          <h2 className="gallery__heading">
            Stories, places and moments that inspire a slower, richer way to
            experience Mangalore.
          </h2>
        </div>
        <button type="button" className="gallery__cta">
          See More Gallery
          <span className="gallery__cta-arrow">→</span>
        </button>
      </div>

      <div className="gallery__track">
        {galleryItems.map((item, i) => {
          const isActive = hovered === i
          const isDimmed = hovered !== null && hovered !== i
          return (
            <div
              key={item.title}
              className={`gallery__card${isActive ? ' gallery__card--active' : ''}${isDimmed ? ' gallery__card--dimmed' : ''}`}
              style={{
                zIndex: isActive ? 10 : i,
                transform: isActive
                  ? 'translateY(-24px) rotate(0deg) scale(1.05)'
                  : `translateY(0) rotate(${item.rotate}deg) scale(1)`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="gallery__card-scrim" />
              <p className="gallery__card-category">{item.category}</p>
              <h3 className="gallery__card-title">{item.title}</h3>
              <button type="button" className="gallery__card-btn">
                Learn More
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
