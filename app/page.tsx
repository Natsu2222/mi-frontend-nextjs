import Image from "next/image";
import BannerSection from '@/components/baner';

// Definimos la interfaz para el tipo de producto


// Actualizamos la interfaz para coincidir con la estructura real
interface ProductCategory {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
      small: {
        url: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: ProductCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Como estamos usando Next.js 13+, podemos hacer el componente async
export default async function Home() {
  const getProductCategories = async (): Promise<StrapiResponse | null> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/product-categories?populate=*`;
      console.log('Intentando conectar a:', url);

      const response = await fetch(url, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Status de la respuesta:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Estructura completa:', JSON.stringify(data, null, 2));
      console.log('Primera categoría:', data.data[0]);
      
      if (data.data[0]?.image) {
        console.log('Datos de la imagen:', data.data[0].image);
      } else {
        console.log('No hay imagen en la primera categoría');
      }

      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return null;
    }
  };

  const result = await getProductCategories();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Categorías de Gambas</h1>
      
      {!result ? (
        <p>Error al cargar los datos</p>
      ) : !result.data ? (
        <p>No hay categorías disponibles</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-8">
            {result.data.map((category) => (
              <div key={category.id} className="flex flex-col gap-4">
                {/* Imagen centrada */}
                {category.image && (
                  <div className="flex justify-center -mb-16 relative z-10">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${category.image.url}`}
                      alt={category.image.alternativeText || category.title}
                      width={200}
                      height={200}
                      className="rounded-full object-cover border-4 border-white shadow-lg"
                      priority
                    />
                  </div>
                )}
                
                {/* Contenedor azul para el título y la descripción */}
                <div className="h-[500px] bg-[#AFEEEE] border border-black p-4 pt-20 overflow-y-auto">
                  <h2 className="text-xl font-bold text-center mb-4 text-gray-800">{category.title}</h2>
                  <p className="text-gray-700 mb-4">{category.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>ID: {category.documentId}</p>
                    <p>Creado: {new Date(category.createdAt).toLocaleDateString()}</p>
                    <p>Actualizado: {new Date(category.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de Banners */}
          <BannerSection />
        </>
      )}
    </div>
  );
}
