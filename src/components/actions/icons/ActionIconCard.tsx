import TagIcon from '@/components/icons/tokens/TagIcon';
import { Badge } from '@/components/ui/badge';
import { ActionCardType, actionToTag } from '@/types/ActionCard';
import { useTranslation } from 'next-i18next';

type ActionIconCardProps = {
  action: ActionCardType;
};

export const ActionIconCard = ({ action }: ActionIconCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='flex h-16 w-12 flex-col items-center justify-between gap-2 rounded border-4 border-[#06abe9] bg-[#84d1f1]  sm:h-20  sm:w-14 md:h-20 md:w-20'>
      <div className='mt-2 scale-125'>
        <TagIcon type={actionToTag(action)} />
      </div>
      <div className='flex h-6 w-full items-center justify-center bg-white text-xs'>
        <p className='invisible md:visible'>{t(action)}</p>
      </div>
    </div>
  );
};
