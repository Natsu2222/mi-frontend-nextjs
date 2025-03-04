import PecesCard, { getFish } from '@/components/peces';

export default async function PaginaPeces() {
  const fishData = await getFish();

  if (!fishData || !fishData.data || fishData.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-white-600">No hay peces disponibles</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white-900 mb-8">Nuestros Peces</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fishData.data.map((fish) => (
            <PecesCard key={fish.id} fish={fish} />
          ))}
        </div>
      </div>
    </div>
  );
}
