const FILTERS = [
  { value: 'Todas', label: 'Todas', dot: null },
  { value: 'Confirmada', label: 'Confirmadas', dot: '#5E8A6E' },
  { value: 'En Espera', label: 'En Espera', dot: '#C8860A' },
  { value: 'Finalizada', label: 'Finalizadas', dot: '#9e8060' },
]

const FilterButtons = ({ active, onChange, counts }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isActive = active === f.value
        const count = f.value === 'Todas' ? counts.total : (counts[f.value] || 0)

        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? {
                    backgroundColor: '#2A1709',
                    color: '#FAF7F0',
                    boxShadow: '0 2px 8px rgba(42,23,9,0.20)',
                  }
                : {
                    backgroundColor: '#FAF7F0',
                    color: '#6b5544',
                    border: '1px solid #e8dcc8',
                  }
            }
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '#F5EFE0'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '#FAF7F0'
              }
            }}
          >
            {f.dot && (
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: isActive ? '#C8860A' : f.dot }}
              />
            )}
            {f.label}
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-mono"
              style={
                isActive
                  ? { backgroundColor: 'rgba(200,134,10,0.25)', color: '#C8860A' }
                  : { backgroundColor: '#F5EFE0', color: '#9e8060' }
              }
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default FilterButtons
