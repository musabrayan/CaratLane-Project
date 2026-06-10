import api from './api'

export const getStores = async () => {
  const response = await api.get('/stores')
  return response.data
}