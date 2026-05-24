const EmptyState = ({ filter, onClear }) => {
  const isFiltered = filter && filter !== 'Todas'

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-3xl"
        style={{ backgroundColor: '#F5EFE0' }}
      >
        🍽️
      </div>
      <h3
        className="font-display text-xl font-semibold mb-2"
        style={{ color: '#2A1709' }}
      >
        {isFiltered
          ? `Sin reservas "${filter}"`
          : 'No hay reservas registradas'}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: '#9e8060' }}>
        {isFiltered
          ? 'No encontramos reservas con ese estado. Prueba con otro filtro.'
          : 'Crea la primera reserva usando el botón "Nueva reserva".'}
      </p>
      {isFiltered && (
        <button
          onClick={onClear}
          className="mt-5 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: '#F5EFE0',
            color: '#2A1709',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ede3cc')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE0')}
        >
          Ver todas
        </button>
      )}
    </div>
  )
}

export default EmptyState
