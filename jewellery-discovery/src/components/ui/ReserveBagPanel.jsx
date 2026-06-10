import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaShoppingBag, FaMapMarkerAlt } from 'react-icons/fa'
import { useOmniChannel } from '../../context/OmniChannelContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const ReserveBagPanel = () => {
  const { reserveBag, isBagOpen, setIsBagOpen, toggleReserve, bookVisit } = useOmniChannel()
  const navigate = useNavigate()
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'
  const [showForm, setShowForm] = useState(false)
  const [bookingData, setBookingData] = useState({
    store: 'CaratLane Bangalore - Indiranagar',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM'
  })

  const handleBooking = () => {
    setStatus('loading')
    setTimeout(() => {
      bookVisit(bookingData.store, bookingData.date, bookingData.time)
      setStatus('success')
      setTimeout(() => {
        setIsBagOpen(false)
        setStatus('idle')
        setShowForm(false)
      }, 2000)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isBagOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight-900 z-[100]"
            onClick={() => setIsBagOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-[110] flex flex-col"
          >
            <div className="p-6 border-b border-pearl-200 flex items-center justify-between bg-ivory-50">
              <div className="flex items-center gap-3">
                <FaShoppingBag className="text-rose-gold-500 text-xl" />
                <h2 className="font-display text-xl text-midnight-800">Reserve Bag</h2>
              </div>
              <button 
                onClick={() => setIsBagOpen(false)}
                className="p-2 text-midnight-400 hover:text-midnight-800 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {reserveBag.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-midnight-400 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-ivory-100 flex items-center justify-center text-3xl">
                    🛍️
                  </div>
                  <p>Your reserve bag is empty.</p>
                  <p className="text-sm max-w-xs">Discover pieces you love and reserve them to try in-store.</p>
                  <button 
                    onClick={() => {
                      setIsBagOpen(false)
                      navigate('/occasion/engagement')
                    }}
                    className="px-6 py-2 bg-midnight-800 text-white rounded-full font-medium mt-4 hover:bg-midnight-700 transition-colors"
                  >
                    Start Discovering
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {reserveBag.map((item, idx) => {
                    const product = item.product
                    return (
                      <div key={idx} className="flex gap-4 p-4 border border-pearl-200 rounded-2xl group hover:border-rose-gold-200 transition-colors">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-midnight-800 text-sm leading-tight pr-4">{product.name}</h3>
                            <button 
                              onClick={() => toggleReserve(product)}
                              className="text-midnight-300 hover:text-red-500 transition-colors"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                          <p className="text-xs text-midnight-400 mt-1 capitalize">{product.metal} • {product.stone || 'Plain'}</p>
                          <div className="mt-2 text-sm font-semibold text-midnight-800">
                            ₹{product.price?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {reserveBag.length > 0 && (
              <div className="p-6 border-t border-pearl-200 bg-white">
                {!showForm && status === 'idle' ? (
                  <>
                    <div className="flex items-start gap-3 p-4 bg-rose-gold-50/50 rounded-xl mb-4 border border-rose-gold-100">
                      <FaMapMarkerAlt className="text-rose-gold-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-midnight-800">Ready to try them on?</p>
                        <p className="text-xs text-midnight-500 mt-0.5">Book a visit to your nearest CaratLane boutique. No commitment to buy.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="w-full py-4 bg-midnight-900 text-white rounded-xl font-bold tracking-wide hover:bg-midnight-800 transition-colors shadow-luxury flex items-center justify-center gap-2"
                    >
                      Book Store Visit
                    </button>
                  </>
                ) : status === 'success' ? (
                  <div className="text-center py-4 text-green-600 font-bold">
                    ✓ Visit Booked Successfully!
                  </div>
                ) : (
                  <div className="space-y-3">
                    <select 
                      className="w-full p-3 border border-pearl-200 rounded-lg text-sm bg-ivory-50"
                      value={bookingData.store}
                      onChange={(e) => setBookingData({...bookingData, store: e.target.value})}
                    >
                      <option value="CaratLane Bangalore - Indiranagar">Bangalore - Indiranagar</option>
                      <option value="CaratLane Chennai - T. Nagar">Chennai - T. Nagar</option>
                      <option value="CaratLane Hyderabad - Banjara Hills">Hyderabad - Banjara Hills</option>
                    </select>
                    <div className="flex gap-3">
                      <input 
                        type="date" 
                        className="w-1/2 p-3 border border-pearl-200 rounded-lg text-sm bg-ivory-50"
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      />
                      <select 
                        className="w-1/2 p-3 border border-pearl-200 rounded-lg text-sm bg-ivory-50"
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      >
                        <option>11:00 AM</option>
                        <option>2:00 PM</option>
                        <option>5:00 PM</option>
                      </select>
                    </div>
                    <button 
                      onClick={handleBooking}
                      disabled={status !== 'idle'}
                      className="w-full py-3 mt-2 rounded-xl font-bold tracking-wide transition-colors shadow-luxury flex items-center justify-center gap-2 bg-midnight-900 text-white hover:bg-midnight-800"
                    >
                      {status === 'loading' ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
