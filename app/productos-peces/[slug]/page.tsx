import Image from 'next/image';


async function getFishBySlug(slug: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:1337/api/fishes?filters[slug][$eq]=${slug}&populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
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

export default async function PecesDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const fish = await getFishBySlug(params.slug);
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
                src={new URL(fish.image.url, 'http://localhost:1337').toString()}
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
}
