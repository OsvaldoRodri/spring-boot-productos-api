import CategoriaBadge from './CategoriaBadge.jsx'

export default function ProductoCard({ producto, onEditar, onEliminar }) {
  const stockColor = producto.stock === 0
    ? 'text-red-600 font-bold'
    : producto.stock < 10
      ? 'text-yellow-600 font-semibold'
      : 'text-green-600'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Cabecera */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-800 text-base leading-snug">
          {producto.nombre}
        </h3>
        <CategoriaBadge categoria={producto.categoria} />
      </div>

      {/* Descripción */}
      {producto.descripcion && (
        <p className="text-sm text-gray-500 line-clamp-2">{producto.descripcion}</p>
      )}

      {/* Precio y stock */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <span className="text-xl font-bold text-gray-900">
          ${Number(producto.precio).toFixed(2)}
        </span>
        <span className={`text-sm ${stockColor}`}>
          Stock: {producto.stock}
        </span>
      </div>

      {/* Acciones */}
      <div className="flex gap-2">
        <button
          onClick={() => onEditar(producto)}
          className="flex-1 text-sm py-1.5 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={() => onEliminar(producto.id)}
          className="flex-1 text-sm py-1.5 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
