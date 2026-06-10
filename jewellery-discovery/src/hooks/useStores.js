import { useEffect, useState } from 'react'
import { getStores } from '../services/storeService'

export const useStores = () => {
  const [state, setState] = useState({
    stores: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setState((current) => ({ ...current, loading: true, error: null }))

      try {
        const response = await getStores()

        if (isMounted) {
          setState({ stores: response.stores || [], loading: false, error: null })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            stores: [],
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
  }, [])

  return state
}