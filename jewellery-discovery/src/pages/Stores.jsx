import { useStores } from '../hooks/useStores'
import Loader from '../components/ui/Loader'

export const Stores = () => {
  const { stores, loading } = useStores()

  if (loading) return <Loader label="Loading boutiques" />

  return (
    <div className="py-12 animate-fade-in">
      <div className="max-w-3xl mb-16">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-champagne-400"></span>
          Our Boutiques
        </p>
        <h1 className="font-display text-display-md sm:text-display-lg text-midnight-800 leading-tight mb-6">
          Experience our collections in person.
        </h1>
        <p className="text-body-lg text-midnight-500 leading-relaxed">
          Book a private consultation at one of our exclusive boutiques across the country. Our experts will guide you through our collections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store, index) => (
          <article 
            key={store.name} 
            className="flex flex-col bg-ivory-50 p-8 rounded-3xl border border-pearl-200 shadow-card-sm hover:shadow-card hover:border-pearl-300 transition-luxury animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold mb-3">{store.city}</p>
            <h2 className="font-display text-2xl text-midnight-800 mb-4">{store.name}</h2>
            <p className="text-midnight-500 leading-relaxed flex-1 mb-8">{store.address}</p>
            
            <div className="flex items-center gap-3 pt-6 border-t border-pearl-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="text-sm font-medium text-midnight-600">Open today until 8:00 PM</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Stores