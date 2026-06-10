import { moments } from '../../data/moments'

const Diamond = () => (
  <svg className="w-4 h-4 text-champagne-400/40 mx-6 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" />
  </svg>
)

export const MomentsMarquee = () => {
  const items = moments.map(m => m.label.toUpperCase())
  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <section className="py-6 overflow-hidden border-y border-pearl-200/50 my-8 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ivory-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ivory-50 to-transparent z-10 pointer-events-none" />

      <div className="marquee-track" aria-label="Browse our moment collections">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-display text-5xl sm:text-6xl lg:text-7xl text-gradient-gold whitespace-nowrap tracking-tight font-light">
              {item}
            </span>
            <Diamond />
          </span>
        ))}
      </div>
    </section>
  )
}

export default MomentsMarquee
