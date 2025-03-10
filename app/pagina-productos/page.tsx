import Image from 'next/image';
import PaginaPeces from '../pagina-Peces/page';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  slug: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ProductResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getProducts(): Promise<ProductResponse | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export default async function PaginaProductos() {
  const productsData = await getProducts();

  if (!productsData || !productsData.data || productsData.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white-600">No hay productos disponibles</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white-900 mb-8">Nuestras Gambas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.data.map((product) => (
            <Link href={`/pagina-productos/${product.slug}`} key={product.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  {product.image?.url ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.image.url}`}
                      alt={product.image.alternativeText || product.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  ) : (
                    <Image
                      src="/images/no-image.png"
                      alt={product.name || 'Producto sin imagen'}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Separador */}
        <div className="my-16 border-t border-gray-200"></div>

        {/* Sección de Peces */}
        <PaginaPeces />
      </div>
    </div>
  );
} 