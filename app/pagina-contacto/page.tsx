'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Datos del formulario:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Contacta con nosotros
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">
              Asunto
            </label>
            <input
              type="text"
              name="asunto"
              id="asunto"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.asunto}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              id="mensaje"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.mensaje}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  )
}