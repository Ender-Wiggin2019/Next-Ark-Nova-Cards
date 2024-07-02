import Image from 'next/image';

import { getMaps } from '@/utils/getMaps';

type MapBoardProps = {
  id: string;
};

export function MapBoard({ id }: MapBoardProps) {
  const mapBoard = getMaps([]).find((mapBoard) => mapBoard.id === id);
  if (!mapBoard) return null;
  return (
    <div>
      <Image
        alt={mapBoard.name}
        priority={true}
        src={`/img/maps/${mapBoard.image}.jpg`}
        className='w-full rounded-md object-contain shadow-lg'
        quality={85}
        width={1000}
        height={1000}
      />
    </div>
  );
}
