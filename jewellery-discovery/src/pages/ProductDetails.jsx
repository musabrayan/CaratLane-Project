import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useStores } from '../hooks/useStores'
import Loader from '../components/ui/Loader'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductStory from '../components/product/ProductStory'
import AvailabilitySection from '../components/product/AvailabilitySection'

export const ProductDetails = () => {
  const { productId } = useParams()
  const { product, loading: productLoading } = useProducts({ id: productId })
  const { stores, loading: storesLoading } = useStores()

  if (productLoading || storesLoading) return <Loader />
  if (!product) return <div className="py-20 text-center text-midnight-500">Product not found</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 py-8 animate-fade-in">
      <ProductGallery product={product} />
      
      <div className="flex flex-col gap-8">
        <ProductInfo product={product} />
        <ProductStory product={product} />
        <AvailabilitySection product={product} stores={stores} />
      </div>
    </div>
  )
}

export default ProductDetails