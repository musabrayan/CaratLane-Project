import { Link } from 'react-router-dom'
import { homePageImages } from '../../data/homePageImages'
import { ScrollReveal } from '../ui/ScrollReveal'
import { moments } from '../../data/moments'

export const Footer = () => {
  return (
    <footer className="animated-gradient-bg border-t border-midnight-700 text-pearl-200 mt-20 relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none">
        <span className="font-display text-[18rem] leading-none text-midnight-700/20 font-bold tracking-tighter">
          C
        </span>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_0.8fr] gap-12 lg:gap-16">
          {/* Brand column */}
          <div>
            <ScrollReveal preset="fadeUp">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-gold-400/20 to-champagne-400/10 border border-rose-gold-500/20 flex items-center justify-center text-rose-gold-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(1)" fill="currentColor" fillRule="nonzero">
                        <path d="M10.217 23.029l2.04.971 2.029-.954-2.04-2.052-2.029 2.035zm4.869-3.812L13.6 20.84l2.577 1.091 1.097-2.588-2.194-.126h.006zm-5.652 0l-2.194.12 1.08 2.589 2.583-1.075-1.474-1.628.005-.006zm8.989 2.126l2.148-.772.766-2.137H18.43l-.006 2.909zM3.206 18.429l.748 2.142 2.132.76v-2.897h-2.88v-.005zm9.063-.863l-1.578.72 1.572 1.577 1.571-1.566-1.571-.748.006.017zM16 16l-.571 1.657h2.222V15.43L16 16zm-9.143 1.651h2.229l-.572-1.645-1.64-.572-.017 2.217zm-3.154-4.04L2.61 16.19 5.2 17.28l.131-2.194L3.71 13.6l-.006.011zm.954-1.342l1.566 1.571.754-1.577-.748-1.572-1.572 1.578zm-4.126 0l.972 2.017 2.051-2.046-2.04-2.023-.983 2.052zM2.63 8.326l1.08 2.577 1.628-1.48-.126-2.194L2.63 8.326zm12.8-1.435L16 8.537l1.64.572V6.897h-2.211v-.006zM6.89 9.103l1.64-.572.572-1.64H6.874l.017 2.212zm3.818-2.857l1.571.748 1.577-.743-1.577-1.588-1.571 1.583zm7.737-.115h2.891L20.571 4l-2.12-.777-.005 2.908zM4 3.96l-.783 2.137h2.897V3.206L4 3.96zm9.663-.251l1.474 1.628 2.194-.12-1.108-2.583-2.56 1.075zM7.263 5.2l2.194.131 1.486-1.622L8.37 2.623 7.263 5.2zM12.286.531l-2.046.972 2.04 2.051 2.046-2.034-2.04-.989z" />
                      </g>
                    </g>
                  </svg>
                </span>
                <div>
                  <strong className="block font-display text-xl text-ivory-50 leading-none">CaratLane</strong>
                  <small className="block font-label text-[0.6rem] uppercase tracking-[0.2em] text-midnight-300 mt-0.5">Moments</small>
                </div>
              </div>
              <p className="text-midnight-200 leading-relaxed max-w-sm mb-6">
                A curated omnichannel experience designed around life moments, not product categories. Discover, reserve, experience.
              </p>
            </ScrollReveal>
          </div>

          {/* Moments links */}
          <div>
            <ScrollReveal preset="fadeUp" delay={0.1}>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-400 font-bold mb-6">
                Moments
              </p>
              <ul className="space-y-3">
                {moments.slice(0, 5).map(m => (
                  <li key={m.slug}>
                    <Link
                      to={`/occasion/${m.slug}`}
                      className="text-midnight-200 hover:text-champagne-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-champagne-400 transition-all duration-300" />
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Company links + image */}
          <div>
            <ScrollReveal preset="fadeUp" delay={0.2}>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-400 font-bold mb-6">
                Company
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { to: '/about', label: 'About' },
                  { to: '/stores', label: 'Our Stores' },
                ].map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-midnight-200 hover:text-champagne-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-champagne-400 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl overflow-hidden border border-midnight-600/50 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img src={homePageImages.footerBanner} alt="Jewellery closing banner" className="h-24 w-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-midnight-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-midnight-400">
          <p>&copy; {new Date().getFullYear()} CaratLane Moments. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-champagne-300 transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-champagne-300 transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-champagne-300 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer