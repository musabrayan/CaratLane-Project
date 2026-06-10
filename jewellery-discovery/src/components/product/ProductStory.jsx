export const ProductStory = ({ product }) => {
  return (
    <section className="p-8 rounded-2xl bg-gradient-to-br from-ivory-100 to-ivory-50 border border-pearl-200 shadow-card-sm text-center">
      <p className="font-display text-2xl lg:text-3xl text-midnight-800 leading-tight italic text-balance">
        "{product.story}"
      </p>
    </section>
  )
}

export default ProductStory