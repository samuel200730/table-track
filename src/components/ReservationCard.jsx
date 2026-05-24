import Swal from 'sweetalert2'

const STATUS_CONFIG = {
  Confirmada: {
    bg: 'rgba(94,138,110,0.12)',
    text: '#3a7050',
    border: 'rgba(94,138,110,0.3)',
    dot: '#5E8A6E',
    label: 'Confirmada',
  },
  'En Espera': {
    bg: 'rgba(200,134,10,0.10)',
    text: '#8a6200',
    border: 'rgba(200,134,10,0.25)',
    dot: '#C8860A',
    label: 'En Espera',
  },
  Finalizada: {
    bg: 'rgba(100,80,60,0.08)',
    text: '#7a6350',
    border: 'rgba(100,80,60,0.15)',
    dot: '#9e8060',
    label: 'Finalizada',
  },
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateStr
  }
}

const ReservationCard = ({ reservation, onEdit, onDelete, onFinalize }) => {
  const { id, nombreCliente, fechaHora, cantidadPersonas, estado } = reservation
  const status = STATUS_CONFIG[estado] || STATUS_CONFIG['En Espera']
  const isFinalized = estado === 'Finalizada'

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Cancelar reserva?',
      html: `<span style="color:#6b5544">¿Estás seguro de cancelar la reserva de <strong>${nombreCliente}</strong>? Esta acción no se puede deshacer.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Mantener',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      try {
        await onDelete(id)
        await Swal.fire({
          title: 'Reserva cancelada',
          html: `<span style="color:#6b5544">La reserva de <strong>${nombreCliente}</strong> fue eliminada.</span>`,
          icon: 'success',
          confirmButtonText: 'Entendido',
        })
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la reserva. Intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        })
      }
    }
  }

  const handleFinalize = async () => {
    const result = await Swal.fire({
      title: '¿Finalizar reserva?',
      html: `<span style="color:#6b5544">Marcar la reserva de <strong>${nombreCliente}</strong> como finalizada.</span>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      try {
        await onFinalize(id)
        Swal.fire({
          title: '¡Finalizada!',
          text: 'La reserva fue marcada como finalizada.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
        })
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo finalizar la reserva.',
          icon: 'error',
        })
      }
    }
  }

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300 flex flex-col gap-4 animate-scale-in"
      style={{
        backgroundColor: '#FAF7F0',
        border: '1px solid #f0e8d4',
        boxShadow: '0 2px 20px rgba(61,35,20,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(61,35,20,0.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 20px rgba(61,35,20,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0"
            style={{ backgroundColor: '#F5EFE0', color: '#3D2314' }}
          >
            {nombreCliente?.charAt(0).toUpperCase()}
          </div>
          <span
            className="font-display font-semibold truncate"
            style={{ color: '#2A1709', fontSize: '1rem' }}
          >
            {nombreCliente}
          </span>
        </div>

        {/* Status badge */}
        <span
          className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: status.bg,
            color: status.text,
            border: `1px solid ${status.border}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: status.dot }}
          />
          {status.label}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6b5544' }}>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-mono text-xs">{formatDate(fechaHora)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6b5544' }}>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {cantidadPersonas}{' '}
            {cantidadPersonas === 1 ? 'persona' : 'personas'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-1 border-t" style={{ borderColor: '#f0e8d4' }}>
        {/* Edit */}
        <button
          onClick={() => onEdit(reservation)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            backgroundColor: '#F5EFE0',
            color: '#3D2314',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ede3cc')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE0')}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>

        {/* Finalize — only if not already finalized */}
        {!isFinalized && (
          <button
            onClick={handleFinalize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
            style={{
              backgroundColor: 'rgba(94,138,110,0.10)',
              color: '#3a7050',
              border: '1px solid rgba(94,138,110,0.2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(94,138,110,0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(94,138,110,0.10)')}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Finalizar
          </button>
        )}

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ml-auto"
          style={{
            backgroundColor: 'rgba(192,87,74,0.08)',
            color: '#9e3a2e',
            border: '1px solid rgba(192,87,74,0.18)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(192,87,74,0.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(192,87,74,0.08)')}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default ReservationCard
