const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div
        className="w-10 h-10 rounded-full border-2 border-t-transparent"
        style={{
          borderColor: '#e8dcc8',
          borderTopColor: '#C8860A',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p className="text-sm" style={{ color: '#9e8060' }}>
        Cargando reservas…
      </p>
    </div>
  )
}

export const SkeletonCard = () => (
  <div
    className="rounded-2xl p-5 space-y-3"
    style={{ backgroundColor: '#FAF7F0', border: '1px solid #f0e8d4' }}
  >
    <div className="flex justify-between items-start">
      <div className="skeleton h-5 w-36 rounded" />
      <div className="skeleton h-5 w-20 rounded-full" />
    </div>
    <div className="skeleton h-4 w-28 rounded" />
    <div className="skeleton h-4 w-24 rounded" />
    <div className="flex gap-2 pt-1">
      <div className="skeleton h-8 w-16 rounded-lg" />
      <div className="skeleton h-8 w-20 rounded-lg" />
      <div className="skeleton h-8 w-16 rounded-lg" />
    </div>
  </div>
)

export default Loader
