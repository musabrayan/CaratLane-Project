import { reserveFlow } from '../../data/moments'
import { homePageImages } from '../../data/homePageImages'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ui/ScrollReveal'

export const ExperienceFlow = () => {
  return (
    <section className="relative bg-midnight-800 rounded-3xl overflow-hidden shadow-card-xl my-section">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(229,192,85,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 p-8 sm:p-12 lg:p-16">
        <ScrollReveal preset="fadeUp">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-champagne-400/60" />
              <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-400 font-bold">
                Reserve &amp; Experience
              </p>
            </div>
            <h2 className="font-display text-display-md md:text-display-lg text-ivory-50 leading-tight">
              The hero feature is the in-store experience.
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline steps */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reserveFlow.map((step, index) => (
            <StaggerItem key={step} preset="fadeUp">
              <div className="relative p-6 rounded-2xl bg-midnight-700/50 border border-midnight-600/50 backdrop-blur-sm group hover:border-champagne-500/30 transition-all duration-500">
                {/* Step number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-400 to-rose-gold-500 flex items-center justify-center text-midnight-900 font-bold text-sm timeline-dot">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  {index < reserveFlow.length - 1 && (
                    <div className="hidden lg:block flex-1 h-[1px] bg-gradient-to-r from-champagne-500/40 to-transparent" />
                  )}
                </div>

                <h3 className="font-display text-2xl text-ivory-50 mb-2">{step}</h3>
                <p className="text-sm text-midnight-200 leading-relaxed">
                  {[
                    'Explore curated collections organised by the moment that matters.',
                    'Reserve your favourite piece online with zero commitment.',
                    'Walk into any boutique and experience it in person.',
                    'Try, feel, and fall in love before you purchase.',
                  ][index]}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Full-width image */}
        <ScrollReveal preset="scaleIn" delay={0.2}>
          <div className="rounded-2xl overflow-hidden border border-midnight-600/50">
            <img
              src={homePageImages.heroBanner}
              alt="Luxury jewellery display"
              className="w-full h-56 sm:h-72 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ExperienceFlow