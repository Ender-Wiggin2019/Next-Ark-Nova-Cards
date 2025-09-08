import { useTranslation } from 'next-i18next';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { CardSource } from '@/types/CardSource';

export type Props = {
  source: CardSource;
};
export const ConfigBadge: React.FC<Props> = ({ source }) => {
  const { t } = useTranslation('common');

  return (
    <Badge
      className={cn(
        '',
        { 'bg-blue-600 hover:bg-blue-500': source === CardSource.MARINE_WORLD },
        { 'bg-zinc-600 hover:bg-zinc-500': source === CardSource.PROMO },
        {
          'bg-amber-600 hover:bg-amber-500': source === CardSource.ALTERNATIVE,
        },
      )}
    >
      {t(source)}
    </Badge>
  );
};
