import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import { getSession } from '../utils/storage'
import { useReservations } from '../hooks/useReservations'
import DashboardLayout from '../layouts/DashboardLayout'
import Header from '../components/Header'
import ReservationCard from '../components/ReservationCard'
import ReservationForm from '../components/ReservationForm'
import FilterButtons from '../components/FilterButtons'
import Loader, { SkeletonCard } from '../components/Loader'
import EmptyState from '../components/EmptyState'

const Panel = () => {
  const session = getSession()
  const [activeFilter, setActiveFilter] = useState('Todas')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const {
    reservations,
    loading,
    error,
    fetchReservations,
    addReservation,
    editReservation,
    removeReservation,
    finalize,
  } = useReservations()

  /* Counts for filter badges */
  const counts = useMemo(() => {
    return {
      total: reservations.length,
      Confirmada: reservations.filter((r) => r.estado === 'Confirmada').length,
      'En Espera': reservations.filter((r) => r.estado === 'En Espera').length,
      Finalizada: reservations.filter((r) => r.estado === 'Finalizada').length,
    }
  }, [reservations])

  /* Filtered list */
  const filtered = useMemo(() => {
    if (activeFilter === 'Todas') return reservations
    return reservations.filter((r) => r.estado === activeFilter)
  }, [reservations, activeFilter])

  /* Open create form */
  const handleOpenCreate = () => {
    setEditingReservation(null)
    setIsFormOpen(true)
  }

  /* Open edit form */
  const handleEdit = (reservation) => {
    setEditingReservation(reservation)
    setIsFormOpen(true)
  }

  /* Close form */
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingReservation(null)
  }

  /* Submit form (create or edit) */
  const handleFormSubmit = async (data) => {
    setFormLoading(true)
    try {
      if (editingReservation) {
        await editReservation(editingReservation.id, data)
        Swal.fire({
          title: '¡Actualizada!',
          text: 'La reserva fue modificada exitosamente.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
        })
      } else {
        await addReservation(data)
        Swal.fire({
          title: '¡Reserva creada!',
          text: 'La nueva reserva fue registrada.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
        })
      }
      handleCloseForm()
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar la reserva. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    } finally {
      setFormLoading(false)
    }
  }

  /* Stats row */
  const stats = [
    { label: 'Total', value: counts.total, color: '#3D2314', bg: '#F5EFE0' },
    { label: 'Confirmadas', value: counts.Confirmada, color: '#3a7050', bg: 'rgba(94,138,110,0.12)' },
    { label: 'En Espera', value: counts['En Espera'], color: '#8a6200', bg: 'rgba(200,134,10,0.10)' },
    { label: 'Finalizadas', value: counts.Finalizada, color: '#7a6350', bg: 'rgba(100,80,60,0.08)' },
  ]

  return (
    <DashboardLayout>
      <Header session={session} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#C8860A' }}>
              Panel principal
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#2A1709' }}>
              Reservas del turno
            </h1>
            <p className="text-sm mt-1" style={{ color: '#9e8060' }}>
              Turno <strong style={{ color: '#6b5544' }}>{session?.shift}</strong> ·{' '}
              {new Date().toLocaleDateString('es-CO', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 self-start sm:self-auto"
            style={{
              backgroundColor: '#C8860A',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(200,134,10,0.30)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b07609'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(200,134,10,0.40)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C8860A'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(200,134,10,0.30)'
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Nueva reserva
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-stagger">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-5 py-4"
              style={{ backgroundColor: s.bg, border: '1px solid rgba(200,134,10,0.08)' }}
            >
              <p className="text-2xl font-bold font-mono" style={{ color: s.color }}>
                {loading ? '—' : s.value}
              </p>
              <p className="text-xs mt-0.5 font-medium" style={{ color: s.color, opacity: 0.75 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter + refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <FilterButtons
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
          <button
            onClick={fetchReservations}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors self-start sm:self-auto"
            style={{ backgroundColor: '#F5EFE0', color: '#6b5544' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ede3cc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE0')}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ animation: loading ? 'spin 0.8s linear infinite' : 'none' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-6 animate-fade-in"
            style={{ backgroundColor: 'rgba(192,87,74,0.08)', border: '1px solid rgba(192,87,74,0.2)' }}
          >
            <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#C0574A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm" style={{ color: '#9e3a2e' }}>{error}</p>
            <button
              onClick={fetchReservations}
              className="ml-auto text-xs font-medium underline"
              style={{ color: '#9e3a2e' }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Reservations grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            filter={activeFilter}
            onClear={() => setActiveFilter('Todas')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger">
            {filtered.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onEdit={handleEdit}
                onDelete={removeReservation}
                onFinalize={finalize}
              />
            ))}
          </div>
        )}
      </main>

      {/* Reservation form modal */}
      <ReservationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editData={editingReservation}
        loading={formLoading}
      />
    </DashboardLayout>
  )
}

export default Panel
