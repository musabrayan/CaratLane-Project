import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/helpers'

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card-body">
        <p className="eyebrow">{product.occasion.replace('-', ' ')}</p>
        <h3>{product.name}</h3>
        <p className="product-summary">{product.description}</p>
        <div className="product-card-meta">
          <span>{formatCurrency(product.price)}</span>
          <span>{product.metal}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard