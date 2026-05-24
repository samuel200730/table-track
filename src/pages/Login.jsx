import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, hasSession } from '../utils/storage'
import { useEffect } from 'react'

const SHIFTS = ['Mañana', 'Tarde', 'Noche']
const SHIFT_ICONS = { 'Mañana': '🌅', 'Tarde': '🌤️', 'Noche': '🌙' }

const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [shift, setShift] = useState('Mañana')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (hasSession()) navigate('/panel', { replace: true })
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre completo')
      return
    }
    if (name.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      saveSession({ name: name.trim(), shift })
      navigate('/panel', { replace: true })
    }, 600)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1A0E05 0%, #2A1709 50%, #3D2314 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C8860A 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #C8860A 0%, transparent 40%)`,
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ backgroundColor: '#C8860A' }}
          >
            <span className="text-2xl">🍽️</span>
          </div>
          <h1 className="font-display text-3xl font-bold" style={{ color: '#FAF7F0' }}>
            TABLE
            <span className="font-light ml-1" style={{ color: '#C8860A' }}>TRACK</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: '#9e8060' }}>
            Gestor de Reservas
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7 animate-scale-in"
          style={{
            backgroundColor: '#FDFBF7',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            border: '1px solid rgba(200,134,10,0.15)',
          }}
        >
          <div className="mb-6">
            <h2 className="font-display text-xl font-semibold" style={{ color: '#2A1709' }}>
              Bienvenido
            </h2>
            <p className="text-sm mt-1" style={{ color: '#9e8060' }}>
              Ingresa para gestionar las reservas del turno
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium mb-1.5"
                style={{ color: '#6b5544' }}
              >
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (error) setError('')
                }}
                placeholder="Ej. Carlos Mendoza"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-150"
                style={{
                  border: `1px solid ${error ? '#C0574A' : '#e8dcc8'}`,
                  backgroundColor: '#fff',
                  color: '#2A1709',
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = '#C8860A'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,134,10,0.12)'
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = '#e8dcc8'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Turno */}
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#6b5544' }}>
                Turno activo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SHIFTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShift(s)}
                    className="py-2.5 px-3 rounded-xl text-sm font-medium flex flex-col items-center gap-1 transition-all duration-150"
                    style={
                      shift === s
                        ? {
                            backgroundColor: '#2A1709',
                            color: '#FAF7F0',
                            boxShadow: '0 2px 8px rgba(42,23,9,0.25)',
                          }
                        : {
                            backgroundColor: '#F5EFE0',
                            color: '#6b5544',
                          }
                    }
                  >
                    <span>{SHIFT_ICONS[s]}</span>
                    <span className="text-xs">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm animate-fade-in"
                style={{ backgroundColor: 'rgba(192,87,74,0.1)', color: '#9e3a2e' }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 mt-2"
              style={{
                backgroundColor: loading ? '#9e8060' : '#C8860A',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(200,134,10,0.35)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#b07609'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#C8860A'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2 border-t-transparent"
                    style={{
                      borderColor: 'rgba(255,255,255,0.4)',
                      borderTopColor: '#fff',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Ingresando…
                </>
              ) : (
                <>
                  Ingresar al panel
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: '#4a3020' }}>
          TABLE-TRACK · Sistema de Gestión de Reservas
        </p>
      </div>
    </div>
  )
}

export default Login
