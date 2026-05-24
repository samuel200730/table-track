import { useState, useEffect, useCallback } from 'react'
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  finalizeReservation,
} from '../services/reservationService'

export const useReservations = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getReservations()
      setReservations(data)
    } catch (err) {
      setError('No se pudieron cargar las reservas. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const addReservation = async (data) => {
    const newReservation = await createReservation(data)
    setReservations((prev) => [newReservation, ...prev])
    return newReservation
  }

  const editReservation = async (id, data) => {
    const updated = await updateReservation(id, data)
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? updated : r))
    )
    return updated
  }

  const removeReservation = async (id) => {
    await deleteReservation(id)
    setReservations((prev) => prev.filter((r) => r.id !== id))
  }

  const finalize = async (id) => {
    const updated = await finalizeReservation(id)
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? updated : r))
    )
    return updated
  }

  return {
    reservations,
    loading,
    error,
    fetchReservations,
    addReservation,
    editReservation,
    removeReservation,
    finalize,
  }
}
