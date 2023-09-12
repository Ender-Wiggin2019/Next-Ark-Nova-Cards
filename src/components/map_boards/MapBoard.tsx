import NextImage from '@/components/NextImage';

import { MapBoard } from '@/types/MapBoard';

type MapBoardProps = {
  mapBoard: MapBoard;
};

export function MapBoard({ mapBoard }: MapBoardProps) {
  return (
    <div>
      <NextImage
        key={mapBoard.id}
        src={mapBoard.image}
        alt={mapBoard.name}
        width={500}
        height={300}
      />
    </div>
  );
}
