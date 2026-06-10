import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { toggleReserveBag as apiToggleReserve, getReserveBag, recordProductView as apiRecordView, getJourney } from '../services/userService'

const OmniChannelContext = createContext(null)

export const OmniChannelProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  
  const [reserveBag, setReserveBag] = useState([])
  const [journey, setJourney] = useState([])
  const [scheduledVisit, setScheduledVisit] = useState(null)
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [isJourneyOpen, setIsJourneyOpen] = useState(false)

  // Load from LocalStorage for Guests or fetch from API if logged in
  const loadData = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const bagData = await getReserveBag()
        if (bagData.success) setReserveBag(bagData.reserveBag)
        
        const journeyData = await getJourney()
        if (journeyData.success) setJourney(journeyData.viewedProducts)
      } catch (err) {
        console.error("Failed to load omni-channel data", err)
      }
    } else {
      const localBag = JSON.parse(localStorage.getItem('cl_guest_bag') || '[]')
      const localJourney = JSON.parse(localStorage.getItem('cl_guest_journey') || '[]')
      setReserveBag(localBag)
      setJourney(localJourney)
    }
    const localVisit = JSON.parse(localStorage.getItem('cl_guest_visit') || 'null')
    setScheduledVisit(localVisit)
  }, [isAuthenticated])

  useEffect(() => {
    loadData()
  }, [loadData])

  const toggleReserve = async (product) => {
    // Optimistic UI update
    const inBag = reserveBag.find(item => item.product._id === product._id || item.product === product._id)
    
    if (inBag) {
      setReserveBag(prev => prev.filter(item => item.product._id !== product._id && item.product !== product._id))
    } else {
      setReserveBag(prev => [...prev, { product, addedAt: new Date().toISOString() }])
    }

    if (isAuthenticated) {
      try {
        await apiToggleReserve(product._id)
        loadData() // re-sync
      } catch (err) {
        console.error("Failed to sync reserve bag", err)
        loadData() // rollback
      }
    } else {
      // Sync to local storage
      const newBag = inBag 
        ? reserveBag.filter(item => item.product._id !== product._id && item.product !== product._id)
        : [...reserveBag, { product, addedAt: new Date().toISOString() }]
      localStorage.setItem('cl_guest_bag', JSON.stringify(newBag))
    }
  }

  const recordView = async (product) => {
    if (!product || !product._id) return

    if (isAuthenticated) {
      try {
        await apiRecordView(product._id)
        loadData() // re-sync
      } catch (err) {
        console.error("Failed to record view", err)
      }
    } else {
      // Manage local storage journey
      let currentJourney = JSON.parse(localStorage.getItem('cl_guest_journey') || '[]')
      
      // Remove if exists
      currentJourney = currentJourney.filter(item => item.product._id !== product._id)
      
      // Add to front
      currentJourney.unshift({ product, viewedAt: new Date().toISOString() })
      
      // Keep last 20
      if (currentJourney.length > 20) {
        currentJourney = currentJourney.slice(0, 20)
      }
      
      localStorage.setItem('cl_guest_journey', JSON.stringify(currentJourney))
      setJourney(currentJourney)
    }
  }

  const bookVisit = (storeName, date, time) => {
    const visitDetails = {
      storeName,
      date,
      time,
      items: reserveBag,
      bookedAt: new Date().toISOString()
    }
    
    setScheduledVisit(visitDetails)
    localStorage.setItem('cl_guest_visit', JSON.stringify(visitDetails))
    
    // Clear the bag after booking
    setReserveBag([])
    localStorage.removeItem('cl_guest_bag')
  }

  const value = {
    reserveBag,
    journey,
    scheduledVisit,
    toggleReserve,
    recordView,
    bookVisit,
    isBagOpen,
    setIsBagOpen,
    isJourneyOpen,
    setIsJourneyOpen
  }

  return <OmniChannelContext.Provider value={value}>{children}</OmniChannelContext.Provider>
}

export const useOmniChannel = () => {
  const context = useContext(OmniChannelContext)
  if (!context) {
    throw new Error('useOmniChannel must be used within an OmniChannelProvider')
  }
  return context
}
