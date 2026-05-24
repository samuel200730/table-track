import axios from 'axios'

// MockAPI endpoint — replace with your own MockAPI project URL
const BASE_URL = 'https://6748f0e75801f5ae7a545039.mockapi.io/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const getReservations = async () => {
  const response = await api.get('/reservations')
  return response.data
}

export const createReservation = async (data) => {
  const response = await api.post('/reservations', data)
  return response.data
}

export const updateReservation = async (id, data) => {
  const response = await api.put(`/reservations/${id}`, data)
  return response.data
}

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservations/${id}`)
  return response.data
}

export const finalizeReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}`, { estado: 'Finalizada' })
  return response.data
}
