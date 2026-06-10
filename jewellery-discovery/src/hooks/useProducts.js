import { useEffect, useState } from 'react'
import { getProductById, getProducts } from '../services/productService'

const initialState = {
  products: [],
  product: null,
  loading: true,
  error: null,
}

export const useProducts = ({ occasion, id } = {}) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setState((current) => ({ ...current, loading: true, error: null }))

      try {
        if (id) {
          const response = await getProductById(id)

          if (isMounted) {
            setState({ products: [], product: response.product, loading: false, error: null })
          }

          return
        }

        const response = await getProducts(occasion ? { occasion } : {})

        if (isMounted) {
          setState({
            products: response.products || [],
            product: null,
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            products: [],
            product: null,
            loading: false,
            error: error.response?.data?.message || error.message,
          })
        }
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [occasion, id])

  return state
}