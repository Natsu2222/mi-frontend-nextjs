export async function getBanners() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/baners?populate[image]=true&populate[acuarios][populate][image]=true`,
    {
      next: { revalidate: 0 }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch banners');
  }

  return res.json();
} 