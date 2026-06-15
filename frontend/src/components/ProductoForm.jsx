import { useState, useEffect } from 'react'

const CATEGORIAS = ['PALETA', 'HELADO', 'BEBIDA', 'SNACK', 'OTRO']

const VACIO = {
  nombre: '', descripcion: '', precio: '', stock: '', categoria: 'PALETA'
}

export default function ProductoForm({ producto, onGuardar, onCancelar, cargando }) {
  const [form, setForm] = useState(VACIO)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(producto
      ? { ...producto, precio: String(producto.precio), stock: String(producto.stock) }
      : VACIO
    )
    setError('')
  }, [producto])

  const cambiar = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const enviar = e => {
    e.preventDefault()
    if (!form.nombre.trim()) return setError('El nombre es obligatorio')
    if (!form.precio || Number(form.precio) <= 0) return setError('El precio debe ser mayor a 0')
    if (form.stock === '' || Number(form.stock) < 0) return setError('El stock no puede ser negativo')
    setError('')
    onGuardar({
      ...form,
      precio: parseFloat(form.precio),
      stock:  parseInt(form.stock),
      activo: true,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5">
          {producto ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        <form onSubmit={enviar} className="flex flex-col gap-4">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre *</label>
            <input
              name="nombre" value={form.nombre} onChange={cambiar}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Paleta de fresa..."
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descripción</label>
            <input
              name="descripcion" value={form.descripcion} onChange={cambiar}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Opcional..."
            />
          </div>

          {/* Precio y stock en fila */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Precio *</label>
              <input
                name="precio" type="number" step="0.01" min="0.01"
                value={form.precio} onChange={cambiar}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="18.00"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Stock *</label>
              <input
                name="stock" type="number" min="0"
                value={form.stock} onChange={cambiar}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="50"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Categoría *</label>
            <select
              name="categoria" value={form.categoria} onChange={cambiar}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botones */}
          <div className="flex gap-3 pt-1">
            <button
              type="button" onClick={onCancelar}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit" disabled={cargando}
              className="flex-1 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {cargando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
