import Image from "next/image";
import Link from 'next/link';



interface Acuario {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
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

interface Banner {
  id: number;
  documentId: string;
  title: string;
  description: string;
  instrucciones: string;
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
  acuarios: Acuario[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface BannerResponse {
  data: Banner[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getBanners(): Promise<BannerResponse | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    const response = await fetch(`${apiUrl}/api/baners?populate[image]=true&populate[acuarios][populate][image]=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(`Error HTTP: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    return null;
  }
}

export default async function BannerSection() {
  const banners = await getBanners();

  if (!banners || !banners.data.length) {
    return (
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-black mb-8 text-blue-100">Banners</h2>
        <p className="text-gray-600">No se pudieron cargar los banners en este momento.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-4xl font-black mb-8 text-blue-100 text-center">Banners</h2>
      <div className="grid grid-cols-1 gap-8">
        {banners.data.map((banner) => (
          <div key={banner.id}>
            <Link 
              href={`/pagina-detalle/${banner.id}`}
              className="block cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden h-[400px]">
                {banner.image && (
                  <div className="relative w-full h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${banner.image.url}`}
                      alt={banner.image.alternativeText || banner.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center backdrop-blur-sm bg-black/30">
                  <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {banner.title}
                  </h3>
                  <p className="text-xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {banner.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
