import Image from 'next/image';

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

async function getFishBySlug(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/fishes?filters[slug][$eq]=${slug}&populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 120 // Revalidar cada 2 minutos
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data && data.data[0]) {
      const fishData = data.data[0];
      
      return {
        name: fishData.name,
        description: fishData.description,
        price: fishData.price,
        slug: fishData.slug,
        image: fishData.image ? {
          url: fishData.image.url,
          alternativeText: fishData.image.alternativeText
        } : null
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching fish:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const slug = await getSlug(params);
  const fish = await getFishBySlug(slug);
  return {
    title: fish ? fish.name : 'Pez no encontrado',
  };
}

export default async function PecesDetailPage({
  params
}: PageProps) {
  try {
    const slug = await getSlug(params);
    const fish = await getFishBySlug(slug);
    console.log('Fish details:', fish);

    if (!fish) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl text-white-600">Pez no encontrado</h1>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 relative h-96 md:w-96 flex items-center justify-center">
              {fish.image?.url ? (
                <Image
                  src={new URL(fish.image.url, process.env.NEXT_PUBLIC_STRAPI_API_URL).toString()}
                  alt={fish.image.alternativeText || fish.name}
                  fill
                  className="object-contain p-4 rounded-2xl"
                  priority
                />
              ) : (
                <Image
                  src="/images/no-image.png"
                  alt={fish.name || 'Pez sin imagen'}
                  fill
                  className="object-contain p-4 rounded-2xl"
                  priority
                />
              )}
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {fish.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {fish.description}
              </p>
              <div className="text-3xl font-bold text-gray-900">
                ${fish.price}
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
        <h1 className="text-2xl text-white-600">Error al cargar el pez</h1>
      </div>
    );
  }
}
