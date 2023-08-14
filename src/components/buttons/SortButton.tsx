import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  TbSortAscending2,
  TbSortAscendingNumbers,
  TbSortDescending2,
  TbSortDescendingNumbers,
  TbStarHalfFilled,
} from 'react-icons/tb';

import TextButton from '@/components/buttons/TextButton';

import { SortOrder } from '@/types/Order';

interface SortButtonProps {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

export const SortButton: React.FC<SortButtonProps> = ({
  sortOrder,
  setSortOrder,
}) => {
  const { t } = useTranslation('common');

  const getSortOrderText = (sortOrder: SortOrder) => {
    switch (sortOrder) {
      case SortOrder.ID_ASC:
        return t('ID');
      case SortOrder.ID_DESC:
        return t('ID');
      case SortOrder.DIFF_ASC:
        return t('Value');
      case SortOrder.DIFF_DESC:
        return t('Value');
      // case SortOrder.RATING_ASC:
      //   return t('Rating');
      case SortOrder.RATING_DESC:
        return t('Rating');
      default:
        return '';
    }
  };

  const getSortIcon = (sortOrder: SortOrder) => {
    switch (sortOrder) {
      case SortOrder.ID_ASC:
        return <TbSortAscendingNumbers />;
      case SortOrder.DIFF_ASC:
        return <TbSortAscending2 />;
      case SortOrder.ID_DESC:
        return <TbSortDescendingNumbers />;
      case SortOrder.DIFF_DESC:
        return <TbSortDescending2 />;
      case SortOrder.RATING_DESC:
        return <TbStarHalfFilled />;
      default:
        return null;
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder((oldSortOrder) => {
      let newSortOrder = oldSortOrder + 1;
      if (newSortOrder > SortOrder.RATING_DESC) {
        newSortOrder = SortOrder.ID_ASC;
      }
      return newSortOrder;
    });
  };

  return (
    <TextButton
      selected={false}
      className='hover:text-zinc-500'
      selectClassName='text-zinc-900 ring-zinc-900/90 ring-2'
      onClick={handleSortOrderChange}
    >
      {getSortIcon(sortOrder)}
      {getSortOrderText(sortOrder)}
    </TextButton>
  );
};
