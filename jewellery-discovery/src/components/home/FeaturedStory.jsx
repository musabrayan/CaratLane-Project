import { ScrollReveal } from '../ui/ScrollReveal'

export const FeaturedStory = ({ story, moment }) => {
  return (
    <section className="py-section relative">
      {/* Decorative vertical gold line */}
      <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 -translate-x-1/2">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-champagne-300/40 to-transparent gold-line-draw" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center">
        {/* Text side */}
        <ScrollReveal preset="slideLeft" className="order-2 lg:order-1">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-rose-gold-400" />
              <p className="font-label text-xs uppercase tracking-[0.2em] text-rose-gold-600 font-bold">
                {story.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-display-md sm:text-display-lg text-midnight-800 leading-tight mb-6">
              {story.title}
            </h2>
            <p className="text-body-lg text-midnight-500 leading-relaxed mb-8">
              {story.copy}
            </p>

            {/* Story stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-pearl-200">
              {[
                { value: '100+', label: 'Curated Designs' },
                { value: '6', label: 'Life Moments' },
                { value: '24K', label: 'Happy Customers' },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} preset="fadeUp" delay={0.1 * (i + 1)}>
                  <div className="text-center lg:text-left">
                    <p className="font-display text-3xl sm:text-4xl text-gradient-gold font-semibold mb-1">{stat.value}</p>
                    <p className="font-label text-[0.65rem] uppercase tracking-[0.15em] text-midnight-400">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Image side */}
        <ScrollReveal preset="slideRight" delay={0.15} className="order-1 lg:order-2">
          <div className="relative">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-ivory-100 to-ivory-50 border border-pearl-200 shadow-card relative overflow-hidden">
              <img
                src={story.image || moment.image}
                alt={moment.label}
                className="w-full h-[400px] object-cover rounded-2xl shadow-inner-sm mb-8"
              />
              <p className="font-display text-2xl sm:text-3xl text-midnight-800 leading-[1.15] text-center italic text-balance">
                &ldquo;{moment.story}&rdquo;
              </p>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-champagne-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-gold-100 rounded-full blur-2xl opacity-30 pointer-events-none" />
            </div>

            {/* Floating accent */}
            <div className="hidden lg:block absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-champagne-100 border border-champagne-200 -z-10 float-gentle" />
            <div className="hidden lg:block absolute -top-4 -right-4 w-14 h-14 rounded-xl bg-rose-gold-50 border border-rose-gold-200 -z-10 float-gentle-delayed" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default FeaturedStory