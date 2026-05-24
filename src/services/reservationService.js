import axios from 'axios'

const BASE_URL = 'https://6a1257a078d0434e0d5d2c58.mockapi.io/api/v1'

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
  const current = await api.get(`/reservations/${id}`)
  const response = await api.put(`/reservations/${id}`, {
    ...current.data,
    estado: 'Finalizada',
  })
  return response.data
}