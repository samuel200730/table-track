import { useState, useEffect } from 'react'

const ESTADOS = ['Confirmada', 'En Espera', 'Finalizada']

const defaultForm = {
  nombreCliente: '',
  fechaHora: '',
  cantidadPersonas: '',
  estado: 'Confirmada',
}

const inputClass = `
  w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-150 outline-none
  bg-white border focus:ring-2
`

const ReservationForm = ({ isOpen, onClose, onSubmit, editData, loading }) => {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  const isEdit = Boolean(editData)

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        // Normalize datetime-local format
        let fechaHora = editData.fechaHora || ''
        if (fechaHora && fechaHora.includes('T')) {
          fechaHora = fechaHora.slice(0, 16)
        } else if (fechaHora && fechaHora.length > 16) {
          fechaHora = fechaHora.slice(0, 16)
        }
        setForm({
          nombreCliente: editData.nombreCliente || '',
          fechaHora,
          cantidadPersonas: editData.cantidadPersonas || '',
          estado: editData.estado || 'Confirmada',
        })
      } else {
        setForm(defaultForm)
      }
      setErrors({})
    }
  }, [isOpen, editData])

  const validate = () => {
    const e = {}
    if (!form.nombreCliente.trim()) e.nombreCliente = 'El nombre del cliente es obligatorio'
    if (!form.cantidadPersonas || isNaN(form.cantidadPersonas) || Number(form.cantidadPersonas) < 1) {
      e.cantidadPersonas = 'Ingresa un número válido de personas'
    }
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit({
      ...form,
      cantidadPersonas: Number(form.cantidadPersonas),
    })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,8,2,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl animate-scale-in"
        style={{
          backgroundColor: '#FDFBF7',
          boxShadow: '0 24px 80px rgba(61,35,20,0.22)',
          border: '1px solid #f0e8d4',
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid #f0e8d4' }}
        >
          <div>
            <h2 className="font-display font-semibold text-lg" style={{ color: '#2A1709' }}>
              {isEdit ? 'Editar reserva' : 'Nueva reserva'}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#9e8060' }}>
              {isEdit
                ? 'Modifica los datos de la reserva'
                : 'Completa la información para registrar'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#F5EFE0', color: '#6b5544' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ede3cc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE0')}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b5544' }}>
              Nombre del cliente <span style={{ color: '#C0574A' }}>*</span>
            </label>
            <input
              type="text"
              name="nombreCliente"
              value={form.nombreCliente}
              onChange={handleChange}
              placeholder="Ej. María Fernanda López"
              disabled={isEdit}
              className={inputClass}
              style={{
                borderColor: errors.nombreCliente ? '#C0574A' : '#e8dcc8',
                color: '#2A1709',
                backgroundColor: isEdit ? '#F5EFE0' : '#fff',
                cursor: isEdit ? 'not-allowed' : 'text',
              }}
            />
            {errors.nombreCliente && (
              <p className="text-xs mt-1" style={{ color: '#C0574A' }}>
                {errors.nombreCliente}
              </p>
            )}
          </div>

          {/* Fecha y hora */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b5544' }}>
              Fecha y hora
            </label>
            <input
              type="datetime-local"
              name="fechaHora"
              value={form.fechaHora}
              onChange={handleChange}
              className={inputClass}
              style={{
                borderColor: '#e8dcc8',
                color: '#2A1709',
                backgroundColor: '#fff',
              }}
            />
          </div>

          {/* Cantidad personas */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b5544' }}>
              Cantidad de personas <span style={{ color: '#C0574A' }}>*</span>
            </label>
            <input
              type="number"
              name="cantidadPersonas"
              value={form.cantidadPersonas}
              onChange={handleChange}
              placeholder="Ej. 4"
              min="1"
              max="50"
              className={inputClass}
              style={{
                borderColor: errors.cantidadPersonas ? '#C0574A' : '#e8dcc8',
                color: '#2A1709',
                backgroundColor: '#fff',
              }}
            />
            {errors.cantidadPersonas && (
              <p className="text-xs mt-1" style={{ color: '#C0574A' }}>
                {errors.cantidadPersonas}
              </p>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b5544' }}>
              Estado
            </label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className={inputClass}
              style={{
                borderColor: '#e8dcc8',
                color: '#2A1709',
                backgroundColor: '#fff',
              }}
            >
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ backgroundColor: '#F5EFE0', color: '#3D2314' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ede3cc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE0')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                backgroundColor: loading ? '#9e8060' : '#2A1709',
                color: '#FAF7F0',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#3D2314'
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#2A1709'
              }}
            >
              {loading && (
                <div
                  className="w-4 h-4 rounded-full border-2 border-t-transparent"
                  style={{
                    borderColor: 'rgba(250,247,240,0.4)',
                    borderTopColor: '#FAF7F0',
                    animation: 'spin 0.7s linear infinite',
                  }}
                />
              )}
              {loading ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReservationForm
