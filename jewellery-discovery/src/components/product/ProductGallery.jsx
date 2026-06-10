import { useState } from 'react'

export const ProductGallery = ({ product, galleryImages = [] }) => {
  const images = galleryImages.length ? galleryImages : [product.image]
  const [activeIndex, setActiveIndex] = useState(0)

  const previous = () => setActiveIndex((current) => (current - 1 + images.length) % images.length)
  const next = () => setActiveIndex((current) => (current + 1) % images.length)

  return (
    <section className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ivory-100 border border-pearl-200 shadow-card">
        <img 
          src={images[activeIndex]} 
          alt={`${product.name} ${activeIndex + 1}`} 
          className="w-full h-full object-cover transition-opacity duration-slow" 
        />
        
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              type="button" 
              className="w-10 h-10 rounded-full bg-ivory-50/80 backdrop-blur-sm border border-pearl-200 text-midnight-800 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
              onClick={previous} 
              aria-label="Previous image"
            >
              ←
            </button>
            <button 
              type="button" 
              className="w-10 h-10 rounded-full bg-ivory-50/80 backdrop-blur-sm border border-pearl-200 text-midnight-800 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
              onClick={next} 
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                index === activeIndex 
                  ? 'border-rose-gold-400 opacity-100' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 p-6 mt-4 rounded-2xl bg-ivory-50 border border-pearl-200 shadow-card-sm">
        <article>
          <p className="font-label text-[0.65rem] uppercase tracking-[0.15em] text-champagne-600 font-bold mb-1">Signature story</p>
          <h3 className="font-display text-lg text-midnight-800 leading-tight mb-2">{product.name}</h3>
          <p className="text-sm text-midnight-500 leading-relaxed">{product.story}</p>
        </article>
        <article>
          <p className="font-label text-[0.65rem] uppercase tracking-[0.15em] text-champagne-600 font-bold mb-1">Edition</p>
          <p className="text-sm text-midnight-800 capitalize mb-2">{product.occasion.replace('-', ' ')}</p>
          <p className="text-sm text-midnight-500">Weight: {product.weight}</p>
        </article>
      </div>
    </section>
  )
}

export default ProductGallery