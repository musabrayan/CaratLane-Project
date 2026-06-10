import api from './api'

export const createReservation = async (payload) => {
  const response = await api.post('/reservations', payload)
  return response.data
}