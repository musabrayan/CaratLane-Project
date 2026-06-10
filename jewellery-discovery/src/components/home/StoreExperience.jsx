import { Link } from 'react-router-dom'
import { FaCircleCheck } from 'react-icons/fa6'
import { homePageImages } from '../../data/homePageImages'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ui/ScrollReveal'

const benefits = [
  { label: 'Private Consultation', desc: 'One-on-one with our jewellery experts' },
  { label: 'Certified Experts', desc: 'GIA-trained gemologists at every store' },
  { label: 'Try Before Purchase', desc: 'Experience the piece before committing' },
]

export const StoreExperience = ({ stores }) => {
  return (
    <section className="py-section">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <ScrollReveal preset="fadeUp">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-rose-gold-400" />
              <p className="font-label text-xs uppercase tracking-[0.2em] text-rose-gold-600 font-bold">
                Store experience
              </p>
            </div>
            <h2 className="font-display text-display-md md:text-display-lg text-midnight-800 leading-tight">
              Reserve online, then visit with confidence.
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal preset="fadeUp" delay={0.15}>
          <Link to="/stores" className="group px-6 py-3 rounded-full bg-ivory-50 border border-pearl-300 text-midnight-600 font-bold shadow-sm hover:bg-white hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
            Explore Stores
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>

      {/* Benefits strip */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {benefits.map((benefit) => (
          <StaggerItem key={benefit.label} preset="fadeUp">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-ivory-50 border border-pearl-200 shadow-card-sm hover:shadow-card hover:border-pearl-300 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-champagne-50 border border-champagne-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCircleCheck className="text-champagne-600 text-sm" />
              </div>
              <div>
                <span className="font-bold text-midnight-700 block mb-1">{benefit.label}</span>
                <span className="text-sm text-midnight-400 leading-relaxed">{benefit.desc}</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Store images — editorial layout */}
      <ScrollReveal preset="fadeUp" className="mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_0.8fr_0.8fr] gap-4 h-[280px] sm:h-[320px]">
          <div className="rounded-2xl overflow-hidden shadow-card-sm relative group">
            <img
              src={homePageImages.storeExperience.showroom}
              alt="Showroom interior"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card-sm relative group hidden sm:block">
            <img
              src={homePageImages.storeExperience.consultant}
              alt="Jewellery consultant assisting a customer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card-sm relative group hidden sm:block">
            <img
              src={homePageImages.storeExperience.customerExperience}
              alt="Customer trying jewellery in store"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </ScrollReveal>

      {/* Store cards */}
      <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.slice(0, 3).map((store) => (
          <StaggerItem key={store.name} preset="cascadeUp">
            <article className="p-6 rounded-2xl bg-ivory-50 border border-pearl-200 shadow-card-sm hover:shadow-card hover:border-pearl-300 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-champagne-400" />
                <p className="font-label text-[0.65rem] uppercase tracking-[0.15em] text-champagne-600 font-bold">{store.city}</p>
              </div>
              <h3 className="font-display text-2xl text-midnight-800 mb-2 group-hover:text-rose-gold-600 transition-colors duration-300">{store.name}</h3>
              <p className="text-sm text-midnight-500 leading-relaxed">{store.address}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}

export default StoreExperience