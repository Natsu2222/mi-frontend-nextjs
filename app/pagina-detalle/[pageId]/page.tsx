import Image from "next/image";
import { getBanners } from "@/components/baner";
import Link from "next/link";

interface PageProps {
  params: {
    pageId: string;
  };
}

export default async function BannerDetailPage({ params }: PageProps) {
  const banners = await getBanners();
  const banner = banners?.data.find((b) => b.id === parseInt(params.pageId));

  if (!banner) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Banner no encontrado</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Banner Hero Section */}
      <div className="relative h-[600px] rounded-xl overflow-hidden mb-12">
        {banner.image && (
          <>
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${banner.image.url}`}
              alt={banner.image.alternativeText || banner.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {banner.title}
          </h1>
          <p className="text-2xl mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {banner.description}
          </p>
        </div>
      </div>

      {/* Instrucciones Section */}
      {banner.instrucciones && (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-500">Instrucciones</h2>
          <p className="text-lg text-gray-700 whitespace-pre-line">{banner.instrucciones}</p>
        </div>
      )}

      {/* Acuarios Relacionados Section */}
      {banner.acuarios && banner.acuarios.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-blue-100">Acuarios Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {banner.acuarios.map((acuario) => (
              <div
                key={acuario.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                {acuario.image && (
                  <div className="relative h-64">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${acuario.image.url}`}
                      alt={acuario.image.alternativeText || acuario.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{acuario.name}</h3>
                  <p className="text-gray-600 mb-4">{acuario.description}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${acuario.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-100 text-white px-8 py-3 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
