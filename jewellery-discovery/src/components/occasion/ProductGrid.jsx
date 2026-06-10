import ProductCard from './ProductCard'

export const ProductGrid = ({ products }) => {
  return (
    <section className="section-space">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid