import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getStorePulse } from '../../services/userService'
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export const StorePulseDropdown = ({ isOpen, onClose }) => {
  const [pulseStores, setPulseStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      getStorePulse().then(data => {
        if (data.success) {
          setPulseStores(data.pulseStores)
        }
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] hidden md:block"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-16 right-1/4 w-80 bg-white rounded-2xl shadow-luxury border border-pearl-200 z-[100] overflow-hidden"
          >
            <div className="p-4 bg-midnight-900 text-white">
              <h3 className="font-display text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                Live Store Pulse
              </h3>
              <p className="text-xs text-midnight-200 mt-1">Real-time status of boutiques near you</p>
            </div>
            
            <div className="p-2 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-sm text-midnight-400">Locating nearest boutiques...</div>
              ) : pulseStores.length === 0 ? (
                <div className="p-4 text-center text-sm text-midnight-400">No stores found nearby.</div>
              ) : (
                pulseStores.map((store, i) => (
                  <div key={store._id || i} className="p-3 hover:bg-ivory-50 rounded-xl transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-midnight-800 text-sm group-hover:text-rose-gold-600 transition-colors">{store.name}</h4>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Open</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-midnight-500">
                        <FaMapMarkerAlt className="text-rose-gold-400" />
                        <span>{store.distance} away</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-midnight-500">
                        <FaClock className="text-rose-gold-400" />
                        <span>Closes at {store.closingTime}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs bg-midnight-50 text-midnight-600 px-2 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${store.crowdLevel === 'Busy' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                      Currently {store.crowdLevel}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-pearl-200 bg-ivory-50">
              <button className="w-full py-2 text-sm font-medium text-midnight-800 bg-white border border-pearl-300 rounded-lg hover:border-rose-gold-300 transition-colors">
                View All Stores
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
