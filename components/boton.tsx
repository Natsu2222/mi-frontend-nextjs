import Link from 'next/link'

interface BotonProps {
  texto?: string
  href?: string
}

export default function Boton({ texto = 'Volver al inicio', href = '/' }: BotonProps) {
  return (
    <Link href={href} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md">
      {texto}
    </Link>
  )
}
