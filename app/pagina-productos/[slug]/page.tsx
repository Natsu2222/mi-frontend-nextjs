import Image from 'next/image';
import { getProducts } from "../page";
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Función auxiliar para obtener el slug
async function getSlug(params: Promise<{ slug: string }>) {
  const resolvedParams = await params;
  if (!resolvedParams.slug) {
    throw new Error('Slug inválido');
  }
  return resolvedParams.slug;
}

// Función auxiliar para buscar el producto
async function getProductBySlug(slug: string) {
  try {
    const productsData = await getProducts();
    if (!productsData || !productsData.data) return null;
    return productsData.data.find((p) => p.slug === slug);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const slug = await getSlug(params);
  const product = await getProductBySlug(slug);
  return {
    title: product ? product.name : 'Producto no encontrado',
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  try {
    const [slug, productsData] = await Promise.all([
      getSlug(params),
      getProducts()
    ]);
    
    const product = productsData?.data?.find((p) => p.slug === slug);
    
    if (!product) {
      notFound();
    }

    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 w-full md:w-[500px] flex items-center justify-center">
                {product.image?.url && (
                  <div className="relative aspect-square w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.image.url}`}
                      alt={product.image.alternativeText || product.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority
                      unoptimized
                    />
                  </div>
                )}
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white-600">Error al cargar el producto</h1>
      </div>
    );
  }
}