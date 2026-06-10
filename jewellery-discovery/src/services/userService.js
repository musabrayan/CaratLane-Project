import api from './api'

export const toggleReserveBag = async (productId) => {
  const response = await api.post('/user/reserve', { productId })
  return response.data
}

export const getReserveBag = async () => {
  const response = await api.get('/user/reserve')
  return response.data
}

export const recordProductView = async (productId) => {
  const response = await api.post('/user/journey/view', { productId })
  return response.data
}

export const getJourney = async () => {
  const response = await api.get('/user/journey')
  return response.data
}

export const getStorePulse = async () => {
  const response = await api.get('/stores/pulse')
  return response.data
}
