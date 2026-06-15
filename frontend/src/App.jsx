import { useState, useEffect, useCallback } from 'react'
import ProductoCard from './components/ProductoCard.jsx'
import ProductoForm from './components/ProductoForm.jsx'
import {
  getProductos, crearProducto, actualizarProducto, eliminarProducto
} from './api/productos.js'

const CATEGORIAS = ['TODAS', 'PALETA', 'HELADO', 'BEBIDA', 'SNACK', 'OTRO']

export default function App() {
  const [productos,     setProductos]     = useState([])
  const [cargando,      setCargando]      = useState(true)
  const [error,         setError]         = useState('')
  const [busqueda,      setBusqueda]      = useState('')
  const [categoria,     setCategoria]     = useState('TODAS')
  const [modalAbierto,  setModalAbierto]  = useState(false)
  const [productoEdit,  setProductoEdit]  = useState(null)
  const [guardando,     setGuardando]     = useState(false)
  const [notif,         setNotif]         = useState('')

  // Carga productos según filtros activos
  const cargarProductos = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const params = {}
      if (busqueda.trim())       params.nombre    = busqueda.trim()
      if (categoria !== 'TODAS') params.categoria = categoria
      const data = await getProductos(params)
      setProductos(data)
    } catch (e) {
      setError('No se pudo conectar con el backend. ¿Está corriendo Spring Boot?')
    } finally {
      setCargando(false)
    }
  }, [busqueda, categoria])

  useEffect(() => {
    const timer = setTimeout(cargarProductos, 300)
    return () => clearTimeout(timer)
  }, [cargarProductos])

  const mostrarNotif = (msg) => {
    setNotif(msg)
    setTimeout(() => setNotif(''), 3000)
  }

  const abrirNuevo  = () => { setProductoEdit(null); setModalAbierto(true) }
  const abrirEditar = (p) => { setProductoEdit(p);   setModalAbierto(true) }
  const cerrarModal = ()  => { setModalAbierto(false); setProductoEdit(null) }

  const guardar = async (datos) => {
    setGuardando(true)
    try {
      if (productoEdit) {
        await actualizarProducto(productoEdit.id, datos)
        mostrarNotif('Producto actualizado')
      } else {
        await crearProducto(datos)
        mostrarNotif('Producto creado')
      }
      cerrarModal()
      cargarProductos()
    } catch (e) {
      mostrarNotif(`Error: ${e.message}`)
    } finally {
      setGuardando(false)
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await eliminarProducto(id)
      mostrarNotif('Producto eliminado')
      cargarProductos()
    } catch (e) {
      mostrarNotif('Error al eliminar')
    }
  }

  // Stats rápidas
  const totalProductos = productos.length
  const valorInventario = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0)
  const sinStock = productos.filter(p => p.stock === 0).length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notificación flotante */}
      {notif && (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-xl shadow-lg text-sm animate-fade-in">
          {notif}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍦</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">HelaDuck</h1>
              <p className="text-xs text-gray-400">Gestión de inventario</p>
            </div>
          </div>
          <button
            onClick={abrirNuevo}
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
          >
            <span className="text-lg leading-none">+</span> Nuevo producto
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Productos activos', value: totalProductos,                          color: 'text-green-600' },
            { label: 'Valor inventario',  value: `$${valorInventario.toFixed(2)}`,        color: 'text-blue-600'  },
            { label: 'Sin stock',         value: sinStock,                                color: sinStock > 0 ? 'text-red-500' : 'text-gray-400' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map(c => (
              <button
                key={c}
                onClick={() => setCategoria(c)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  categoria === c
                    ? 'bg-green-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        {cargando ? (
          <div className="text-center py-20 text-gray-400">Cargando productos...</div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-sm mb-3">{error}</p>
            <button onClick={cargarProductos} className="text-sm text-green-600 underline">
              Reintentar
            </button>
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p>No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {productos.map(p => (
              <ProductoCard
                key={p.id}
                producto={p}
                onEditar={abrirEditar}
                onEliminar={eliminar}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalAbierto && (
        <ProductoForm
          producto={productoEdit}
          onGuardar={guardar}
          onCancelar={cerrarModal}
          cargando={guardando}
        />
      )}
    </div>
  )
}
