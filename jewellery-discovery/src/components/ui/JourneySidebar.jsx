import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaBookOpen, FaRegEye, FaRegCalendarCheck } from 'react-icons/fa'
import { useOmniChannel } from '../../context/OmniChannelContext'
import { useNavigate } from 'react-router-dom'

export const JourneySidebar = () => {
  const { journey, scheduledVisit, isJourneyOpen, setIsJourneyOpen } = useOmniChannel()
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {isJourneyOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight-900 z-[100]"
            onClick={() => setIsJourneyOpen(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-[10px_0_30px_rgba(0,0,0,0.1)] z-[110] flex flex-col"
          >
            <div className="p-6 border-b border-pearl-200 flex items-center justify-between bg-midnight-900 text-white">
              <div className="flex items-center gap-3">
                <FaBookOpen className="text-rose-gold-400 text-xl" />
                <h2 className="font-display text-xl">My Journey</h2>
              </div>
              <button 
                onClick={() => setIsJourneyOpen(false)}
                className="p-2 text-midnight-300 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-ivory-50">
              <p className="text-sm text-midnight-500 mb-6">A timeline of your discovery experience across our digital and physical boutiques.</p>
              
              {journey.length === 0 && !scheduledVisit ? (
                <div className="text-center py-10 text-midnight-400">
                  <div className="w-16 h-16 rounded-full bg-white border border-pearl-200 mx-auto flex items-center justify-center mb-4 text-2xl">
                    ✨
                  </div>
                  <p>Your journey begins here.</p>
                  <p className="text-xs mt-2">Products you view will appear on this timeline.</p>
                </div>
              ) : (
                <div className="relative border-l border-pearl-200 ml-3 space-y-8 pb-10">
                  
                  {scheduledVisit && (
                    <div className="relative pl-6">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-ivory-50 border-2 border-green-500 flex items-center justify-center">
                        <FaRegCalendarCheck className="text-[10px] text-green-600" />
                      </div>
                      <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Upcoming Visit</div>
                      <div className="bg-white p-3 rounded-xl border border-pearl-200 shadow-sm">
                        <h4 className="text-sm font-medium text-midnight-800">Store: {scheduledVisit.storeName}</h4>
                        <p className="text-xs text-midnight-500 mt-1">{scheduledVisit.date} at {scheduledVisit.time}</p>
                        <p className="text-xs text-midnight-400 mt-2 italic">You have {scheduledVisit.items.length} items reserved to try on.</p>
                      </div>
                    </div>
                  )}

                  {journey.map((item, idx) => {
                    const product = item.product
                    if (!product) return null
                    
                    // Format relative time (mocking for demo)
                    const timeLabel = idx === 0 ? 'Just now' : idx === 1 ? '10 mins ago' : 'Earlier today'

                    return (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-ivory-50 border-2 border-pearl-300 flex items-center justify-center">
                          <FaRegEye className="text-[8px] text-midnight-400" />
                        </div>
                        <div className="text-xs font-medium text-midnight-400 mb-2">{timeLabel}</div>
                        <div 
                          className="flex gap-3 cursor-pointer group"
                          onClick={() => {
                            setIsJourneyOpen(false)
                            navigate('/occasion/engagement') // routing to main page for demo
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover rounded-lg border border-pearl-200 group-hover:border-rose-gold-300 transition-colors"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-midnight-800 group-hover:text-rose-gold-600 transition-colors leading-tight">{product.name}</h4>
                            <p className="text-xs text-midnight-500 mt-1 capitalize">Viewed in {product.occasion}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
