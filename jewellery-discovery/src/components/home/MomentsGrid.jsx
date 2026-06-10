import { Link } from 'react-router-dom'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ui/ScrollReveal'
import { MagneticCard } from '../ui/MagneticCard'

export const MomentsGrid = ({ moments }) => {
  return (
    <section className="py-section">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <ScrollReveal preset="fadeUp">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-champagne-400" />
              <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold">
                Shop by life moment
              </p>
            </div>
            <h2 className="font-display text-display-md md:text-display-lg text-midnight-800 leading-tight">
              Choose the story before the style.
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="fadeUp" delay={0.2}>
          <p className="text-midnight-500 max-w-sm md:text-right leading-relaxed">
            Each collection is curated to feel premium, focused, and easy to browse.
          </p>
        </ScrollReveal>
      </div>

      {/* Editorial grid — first item is large */}
      <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moments.map((moment, index) => (
          <StaggerItem
            key={moment.slug}
            preset="cascadeUp"
            className={index === 0 ? 'sm:col-span-2 lg:col-span-2 sm:row-span-2' : ''}
          >
            <MagneticCard
              as="div"
              intensity={5}
              className="h-full"
            >
              <Link
                to={`/occasion/${moment.slug}`}
                className={`shimmer-hover group relative flex flex-col justify-between overflow-hidden border border-white/10 shadow-card hover:shadow-gold-lg transition-all duration-500 rounded-3xl ${
                  index === 0 ? 'min-h-[30rem]' : 'min-h-[22rem]'
                }`}
                style={{ display: 'flex', height: '100%' }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${moment.heroImage || moment.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-midnight-900/30 via-midnight-900/50 to-midnight-900/90" />

                {/* Top tag */}
                <div className="relative z-10 flex items-start justify-end p-6">
                  <span className="font-label text-[0.65rem] uppercase tracking-[0.15em] text-champagne-300 font-bold bg-black/25 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                    {moment.hint || moment.label}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 mt-auto p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-[1px] bg-champagne-400/60" />
                    <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-champagne-400">
                      {moment.label}
                    </p>
                  </div>
                  <h3 className={`font-display text-ivory-50 leading-tight mb-3 ${
                    index === 0 ? 'text-4xl lg:text-5xl' : 'text-3xl'
                  }`}>
                    {moment.title}
                  </h3>
                  <p className={`text-midnight-200 leading-relaxed mb-6 ${
                    index === 0 ? 'text-base max-w-md' : 'text-sm'
                  }`}>
                    {moment.copy || moment.subtitle}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-bold text-champagne-400 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                      Explore collection
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </MagneticCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}

export default MomentsGrid