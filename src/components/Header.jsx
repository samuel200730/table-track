import { useNavigate } from 'react-router-dom'
import { clearSession } from '../utils/storage'

const SHIFT_ICONS = {
  'Mañana': '🌅',
  'Tarde': '🌤️',
  'Noche': '🌙',
}

const Header = ({ session }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <header
      style={{
        backgroundColor: '#2A1709',
        borderBottom: '1px solid rgba(200,134,10,0.15)',
      }}
      className="sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: '#C8860A', color: '#fff' }}
            >
              TT
            </div>
            <div>
              <span
                className="font-display font-semibold tracking-wide"
                style={{ color: '#FAF7F0', fontSize: '1.1rem' }}
              >
                TABLE
              </span>
              <span
                className="font-display font-light tracking-widest ml-1"
                style={{ color: '#C8860A', fontSize: '1.1rem' }}
              >
                TRACK
              </span>
            </div>
          </div>

          {/* Session info + logout */}
          {session && (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span
                  className="text-sm font-medium"
                  style={{ color: '#FAF7F0' }}
                >
                  {session.name}
                </span>
                <span
                  className="text-xs flex items-center gap-1"
                  style={{ color: '#9e8060' }}
                >
                  {SHIFT_ICONS[session.shift] || '⏰'} Turno {session.shift}
                </span>
              </div>

              {/* Mobile: avatar initial */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold sm:hidden"
                style={{ backgroundColor: 'rgba(200,134,10,0.2)', color: '#C8860A' }}
              >
                {session.name?.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(200,134,10,0.12)',
                  color: '#C8860A',
                  border: '1px solid rgba(200,134,10,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(200,134,10,0.22)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(200,134,10,0.12)'
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
