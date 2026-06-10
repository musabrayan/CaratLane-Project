import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaSignOutAlt, FaUser, FaShoppingBag, FaBookOpen } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useOmniChannel } from '../../context/OmniChannelContext'
import { useState } from 'react'
import { StorePulseDropdown } from '../ui/StorePulseDropdown'

const navItems = [
  { to: '/occasion/engagement', label: 'Moments' },
  { to: '/stores', label: 'Stores' },
  { to: '/about', label: 'About' },
]

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { reserveBag, setIsBagOpen, setIsJourneyOpen } = useOmniChannel()
  const [isPulseOpen, setIsPulseOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-[80] backdrop-blur-md bg-ivory-50/80 border-b border-pearl-200 shadow-sm transition-all duration-300">
      <div className="max-w-[1240px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="CaratLane Moments home">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-gold-100 to-rose-gold-50 border border-rose-gold-200 flex items-center justify-center text-rose-gold-500 shadow-inner-sm group-hover:shadow-gold transition-luxury">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="IconLogoImage-Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="IconLogoImage-CL-Logo" transform="translate(1)" fill="currentColor" fillRule="nonzero">
                  <path d="M10.217 23.029l2.04.971 2.029-.954-2.04-2.052-2.029 2.035zm4.869-3.812L13.6 20.84l2.577 1.091 1.097-2.588-2.194-.126h.006zm-5.652 0l-2.194.12 1.08 2.589 2.583-1.075-1.474-1.628.005-.006zm8.989 2.126l2.148-.772.766-2.137H18.43l-.006 2.909zM3.206 18.429l.748 2.142 2.132.76v-2.897h-2.88v-.005zm9.063-.863l-1.578.72 1.572 1.577 1.571-1.566-1.571-.748.006.017zM16 16l-.571 1.657h2.222V15.43L16 16zm-9.143 1.651h2.229l-.572-1.645-1.64-.572-.017 2.217zm-3.154-4.04L2.61 16.19 5.2 17.28l.131-2.194L3.71 13.6l-.006.011zm.954-1.342l1.566 1.571.754-1.577-.748-1.572-1.572 1.578zm-4.126 0l.972 2.017 2.051-2.046-2.04-2.023-.983 2.052zM2.63 8.326l1.08 2.577 1.628-1.48-.126-2.194L2.63 8.326zm12.8-1.435L16 8.537l1.64.572V6.897h-2.211v-.006zM6.89 9.103l1.64-.572.572-1.64H6.874l.017 2.212zm3.818-2.857l1.571.748 1.577-.743-1.577-1.588-1.571 1.583zm7.737-.115h2.891L20.571 4l-2.12-.777-.005 2.908zM4 3.96l-.783 2.137h2.897V3.206L4 3.96zm9.663-.251l1.474 1.628 2.194-.12-1.108-2.583-2.56 1.075zM7.263 5.2l2.194.131 1.486-1.622L8.37 2.623 7.263 5.2zM12.286.531l-2.046.972 2.04 2.051 2.046-2.034-2.04-.989z" id="IconLogoImage-Shape"></path>
                </g>
              </g>
            </svg>
          </span>
          <div>
            <strong className="block font-display text-2xl text-midnight-800 leading-none tracking-tight">CaratLane</strong>
            <small className="block font-label text-[0.65rem] uppercase tracking-[0.2em] text-midnight-400 mt-1">Moments</small>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-rose-gold-600' : 'text-midnight-500 hover:text-rose-gold-500'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          {/* Live Store Pulse Indicator */}
          <button 
            onClick={() => setIsPulseOpen(!isPulseOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-ivory-100 rounded-full hover:bg-ivory-200 transition-colors border border-pearl-200"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-midnight-600">Store Pulse</span>
          </button>
          
          <StorePulseDropdown isOpen={isPulseOpen} onClose={() => setIsPulseOpen(false)} />
        </nav>

        <div className="flex items-center gap-5">
          {/* Omni-Channel Actions */}
          <div className="flex items-center gap-3 border-r border-pearl-200 pr-5">
            <button 
              onClick={() => setIsJourneyOpen(true)}
              className="text-midnight-400 hover:text-rose-gold-600 transition-colors p-2"
              title="My Journey"
            >
              <FaBookOpen className="text-lg" />
            </button>
            <button 
              onClick={() => setIsBagOpen(true)}
              className="relative text-midnight-400 hover:text-rose-gold-600 transition-colors p-2"
              title="Reserve Bag"
            >
              <FaShoppingBag className="text-lg" />
              {reserveBag.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-gold-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                  {reserveBag.length}
                </span>
              )}
            </button>
          </div>

          {isAuthenticated ? (
            <>
              <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne-50 border border-champagne-200 text-champagne-700 text-sm font-semibold">
                <FaUser className="text-xs" />
                <span>{user?.name?.split(' ')[0]}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-midnight-500 hover:text-rose-gold-600 transition-colors"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm font-medium text-midnight-500 hover:text-rose-gold-600 transition-colors">
                Sign In
              </NavLink>
              <NavLink to="/register" className="px-5 py-2.5 rounded-full bg-rose-gold-500 text-white text-sm font-bold shadow-gold hover:bg-rose-gold-400 hover:-translate-y-0.5 transition-luxury">
                Join
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar