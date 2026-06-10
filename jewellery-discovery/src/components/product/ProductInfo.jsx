import { Link } from 'react-router-dom'
import { FaGem } from 'react-icons/fa'

export const ProductInfo = ({ product }) => {
  return (
    <section className="flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-label text-xs uppercase tracking-[0.15em] text-rose-gold-600 font-bold bg-rose-gold-50 px-3 py-1 rounded-full border border-rose-gold-200">
          {product.occasion.replace('-', ' ')}
        </span>
      </div>
      
      <h1 className="font-display text-display-md lg:text-display-lg text-midnight-800 leading-[1.1] mb-4">
        {product.name}
      </h1>
      
      <p className="font-display text-3xl font-semibold text-champagne-700 mb-6">
        ₹{product.price.toLocaleString('en-IN')}
      </p>
      
      <p className="text-body-lg text-midnight-500 leading-relaxed mb-8">
        {product.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="p-4 rounded-xl bg-ivory-50 border border-pearl-200">
          <p className="font-label text-xs text-midnight-400 mb-1 uppercase tracking-wider">Metal</p>
          <p className="font-medium text-midnight-800">{product.metal}</p>
        </div>
        <div className="p-4 rounded-xl bg-ivory-50 border border-pearl-200">
          <p className="font-label text-xs text-midnight-400 mb-1 uppercase tracking-wider">Stone</p>
          <p className="font-medium text-midnight-800">{product.stone || 'None'}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link 
          to={`/reserve?productId=${product._id}`} 
          className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-rose-gold-500 text-white font-bold text-lg shadow-gold hover:bg-rose-gold-400 hover:-translate-y-0.5 transition-luxury"
        >
          <FaGem className="text-sm" />
          Reserve In Store
        </Link>
        <p className="text-center text-sm text-midnight-400">
          Secure this piece for a private viewing at your preferred location.
        </p>
      </div>
    </section>
  )
}

export default ProductInfo