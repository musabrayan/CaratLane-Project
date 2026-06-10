import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { moments } from '../data/moments'
import Loader from '../components/ui/Loader'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal'
import { MagneticCard } from '../components/ui/MagneticCard'
import { useOmniChannel } from '../context/OmniChannelContext'

export const OccasionPage = () => {
  const { occasion: occasionSlug } = useParams()
  const occasion = moments.find(m => m.slug === occasionSlug)
  const { products, loading } = useProducts({ occasion: occasionSlug })
  const { toggleReserve, reserveBag, recordView } = useOmniChannel()
  const navigate = useNavigate()

  if (loading) return <Loader label="Loading collection" />
  if (!occasion) return <div className="py-20 text-center text-midnight-500">Occasion not found</div>

  return (
    <div className="py-8">
      {/* Occasion header */}
      <ScrollReveal preset="fadeUp">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-ivory-100 p-8 sm:p-12 rounded-3xl border border-pearl-200 shadow-card mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-champagne-400" />
              <p className="font-label text-xs uppercase tracking-[0.2em] text-champagne-600 font-bold">
                Curated Collection
              </p>
            </div>
            <h1 className="font-display text-display-md sm:text-display-lg text-midnight-800 leading-[1.05] mb-4">
              {occasion.title}
            </h1>
            <p className="text-body-lg text-midnight-500 leading-relaxed">{occasion.story}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Product grid with magnetic cards */}
      <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <StaggerItem key={product._id} preset="cascadeUp">
            <MagneticCard intensity={4} className="h-full">
              <div
                onClick={() => {
                  recordView(product);
                  navigate(`/product/${product._id}`);
                }}
                className="shimmer-hover group flex flex-col bg-ivory-50 rounded-2xl overflow-hidden border border-pearl-200 shadow-card-sm hover:shadow-card-lg hover:border-pearl-300 transition-all duration-400 h-full cursor-pointer relative"
              >
                <div className="aspect-[4/5] overflow-hidden bg-ivory-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-20">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReserve(product);
                      }}
                      className="bg-ivory-50/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-rose-gold-600 shadow-sm border border-pearl-200 hover:bg-white hover:border-rose-gold-300 transition-colors"
                    >
                      {reserveBag.some(item => item.product._id === product._id || item.product === product._id) 
                        ? '✓ Reserved' 
                        : '+ Reserve'}
                    </button>
                    <span className="bg-midnight-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm border border-midnight-800 text-center">
                      View
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-display text-xl text-midnight-800 leading-tight group-hover:text-rose-gold-600 transition-colors duration-300">{product.name}</h3>
                    <span className="font-label text-sm font-bold text-champagne-700 whitespace-nowrap">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-sm text-midnight-400 mb-6 flex-1 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-2 pt-4 border-t border-pearl-200 mt-auto">
                    <span className="font-label text-[0.65rem] uppercase tracking-wider text-midnight-400 bg-pearl-100 px-2 py-1 rounded-md">{product.metal}</span>
                    {product.stone && <span className="font-label text-[0.65rem] uppercase tracking-wider text-midnight-400 bg-pearl-100 px-2 py-1 rounded-md">{product.stone}</span>}
                  </div>
                </div>
              </div>
            </MagneticCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

export default OccasionPage