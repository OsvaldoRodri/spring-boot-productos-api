// Todas las llamadas al backend Spring Boot en un solo lugar
// La URL base apunta al proxy de Vite en desarrollo (redirige a localhost:8080)
const BASE_URL = '/api/productos'

export async function getProductos(params = {}) {
  const query = new URLSearchParams(params).toString()
  const url   = query ? `${BASE_URL}?${query}` : BASE_URL
  const res   = await fetch(url)
  if (!res.ok) throw new Error('Error al obtener productos')
  return res.json()
}

export async function getProductoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Producto no encontrado')
  return res.json()
}

export async function crearProducto(producto) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Error al crear producto')
  }
  return res.json()
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Error al actualizar producto')
  }
  return res.json()
}

export async function actualizarStock(id, cantidad) {
  const res = await fetch(`${BASE_URL}/${id}/stock?cantidad=${cantidad}`, {
    method: 'PATCH',
  })
  if (!res.ok) throw new Error('Error al actualizar stock')
  return res.json()
}

export async function eliminarProducto(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar producto')
}
