import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export const AvailabilitySection = ({ product, stores }) => {
  return (
    <section className="bg-ivory-50 rounded-2xl border border-pearl-200 shadow-card-sm overflow-hidden">
      <div className="bg-pearl-50 px-6 py-4 border-b border-pearl-200">
        <h3 className="font-display text-xl text-midnight-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-champagne-600 text-base" />
          Store Availability
        </h3>
      </div>
      <ul className="divide-y divide-pearl-200">
        {stores.map((store) => {
          const isAvailable = product.availability.includes(store.city)
          return (
            <li key={store.city} className="flex items-center justify-between px-6 py-4">
              <div className="flex flex-col">
                <span className="font-medium text-midnight-800">{store.city}</span>
                <span className="text-xs text-midnight-400">{store.name}</span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium ${isAvailable ? 'text-emerald-700' : 'text-blush-600'}`}>
                {isAvailable ? (
                  <>
                    <FaCheckCircle /> Available
                  </>
                ) : (
                  <>
                    <FaTimesCircle /> Unavailable
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default AvailabilitySection