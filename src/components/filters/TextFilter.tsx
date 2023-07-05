import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

interface TextFilterProps {
  onTextChange: (newText: string) => void;
}

export const TextFilter: React.FC<TextFilterProps> = ({ onTextChange }) => {
  const { t } = useTranslation('common');
  const [text, setText] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    onTextChange(event.target.value);
  };

  return (
    <input
      type='text'
      value={text}
      onChange={handleChange}
      placeholder={t('Filter text...')}
    />
  );
};
