import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type TTextFilterProps = {
  onTextChange: (newText: string) => void;
  reset: boolean;
};

const DEBOUNCE_MS = 250;

export const TextFilter: React.FC<TTextFilterProps> = ({
  onTextChange,
  reset,
}) => {
  const { t } = useTranslation('common');
  const [text, setText] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const debouncedTextChange = useCallback(
    (value: string) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onTextChange(value), DEBOUNCE_MS);
    },
    [onTextChange],
  );

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setText(value);
      debouncedTextChange(value);
    },
    [debouncedTextChange],
  );

  useEffect(() => {
    if (reset) {
      setText('');
    }
  }, [reset]);

  return (
    <div className='group relative flex w-full rounded-xl bg-gradient-to-b from-sage-50/50 to-white/70 px-4 py-2.5 shadow-lg shadow-sage-500/10 ring-1 ring-sage-200/40 dark:from-sage-900/70 dark:to-sage-950/60 dark:shadow-sage-700/10 dark:ring-sage-700/30 lg:w-1/2'>
      <input
        className='block w-full border-0 bg-transparent p-0 text-sm leading-6 text-foreground placeholder-muted-foreground outline-none focus:outline-none focus:ring-0'
        value={text}
        placeholder={t('Filter text') + '...'}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
