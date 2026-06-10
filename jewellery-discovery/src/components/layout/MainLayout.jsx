import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

import { StorePulseDropdown } from '../ui/StorePulseDropdown'
import { ReserveBagPanel } from '../ui/ReserveBagPanel'
import { JourneySidebar } from '../ui/JourneySidebar'

export const MainLayout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 selection:bg-rose-gold-200 selection:text-midnight-900">
      <Navbar />
      <ReserveBagPanel />
      <JourneySidebar />
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 py-8 relative z-base">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout