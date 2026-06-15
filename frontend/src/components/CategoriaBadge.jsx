const COLORES = {
  PALETA:  'bg-pink-100 text-pink-700',
  HELADO:  'bg-blue-100 text-blue-700',
  BEBIDA:  'bg-cyan-100 text-cyan-700',
  SNACK:   'bg-yellow-100 text-yellow-700',
  OTRO:    'bg-gray-100 text-gray-600',
}

export default function CategoriaBadge({ categoria }) {
  const clase = COLORES[categoria] || COLORES.OTRO
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${clase}`}>
      {categoria}
    </span>
  )
}
