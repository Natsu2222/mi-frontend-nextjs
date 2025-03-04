import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://localhost:3000'

  // Solo rutas estáticas basadas en tu estructura de carpetas en Next.js
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/inicio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pagina-detalle/11`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pagina-detalle/10`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pagina-contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Agrega aquí todas las demás rutas según tu estructura de carpetas
  ]
}
