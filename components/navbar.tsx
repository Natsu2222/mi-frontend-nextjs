import Boton from './boton'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Boton texto="Inicio" href="/" />
            <Boton texto="Productos" href="/pagina-productos" />
            <Boton texto="Contacto" href="/pagina-contacto" />
          </div>
        </div>
      </div>
    </nav>
  )
}
