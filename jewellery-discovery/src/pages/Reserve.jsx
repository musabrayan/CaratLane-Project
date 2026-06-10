import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { useStores } from '../hooks/useStores'
import Loader from '../components/ui/Loader'
import ReserveModal from '../components/reserve/ReserveModal'
import { createReservation } from '../services/reservationService'

export const Reserve = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('productId')
  const { product, loading: productLoading } = useProducts({ id: productId })
  const { stores, loading: storesLoading } = useStores()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const payloadProductId = useMemo(() => product?._id || productId, [product, productId])

  const handleSubmit = async (form) => {
    setLoading(true)

    try {
      await createReservation({
        ...form,
        productId: payloadProductId,
      })
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  if (productLoading || storesLoading) {
    return <Loader label="Loading reserve experience" />
  }

  return (
    <div className="reserve-page-wrap">
      <ReserveModal
        product={product}
        stores={stores}
        onSubmit={handleSubmit}
        loading={loading}
        success={success}
        userName={user?.name || ''}
      />
    </div>
  )
}

export default Reserve