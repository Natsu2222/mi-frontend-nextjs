import Image from 'next/image';
import Link from 'next/link';

interface Fish {
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

export interface FishResponse {
  data: Fish[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getFish(): Promise<FishResponse | null> {
  try {
    const response = await fetch('http://127.0.0.1:1337/api/fishes?populate=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Transformar los datos para que coincidan con la interfaz Fish
    const transformedData = {
      data: data.data.map((fish: any) => ({
        id: fish.id,
        name: fish.name,
        description: fish.description,
        price: fish.price,
        slug: fish.slug,
        image: fish.image ? {
          url: fish.image.url,
          alternativeText: fish.image.alternativeText
        } : null,
        createdAt: fish.createdAt,
        updatedAt: fish.updatedAt,
        publishedAt: fish.publishedAt
      })),
      meta: data.meta
    };
    return transformedData;
  } catch (error) {
    console.error('Error fetching fish:', error);
    return null;
  }
}

interface PecesProps {
  fish: Fish;
}

export default function PecesCard({ fish }: PecesProps) {
  return (
    <Link href={`/productos-peces/${fish.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48">
          {fish.image?.url ? (
            <Image
              src={`http://localhost:1337${fish.image.url}`}
              alt={fish.image.alternativeText || fish.name}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/images/no-image.png"
              alt={fish.name || 'Pez sin imagen'}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {fish.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {fish.description}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            ${fish.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export type { Fish };
