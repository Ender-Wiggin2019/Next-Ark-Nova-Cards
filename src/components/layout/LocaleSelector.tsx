import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback, useMemo, useState } from 'react';

import { Select } from '../ui/Select';

const LocaleSelector: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { t, i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: 'language',
    });
  }, [currentLanguage]);

  const [value, setValue] = useState({
    value: i18n.language,
    label: capitalize(languageNames.of(currentLanguage) ?? currentLanguage),
  });

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath;

      return router.push(path, path, { locale });
    },
    [router]
  );

  const languageChanged = useCallback(
    async (locale: string) => {
      console.log('locale', locale);
      const option = capitalize(languageNames.of(locale) ?? locale);
      setValue({ value: locale, label: option });

      if (onChange) {
        onChange(locale);
      }

      await switchToLocale(locale);
    },
    [switchToLocale, onChange]
  );

  return (
    <Select.Root value={value.value} onValueChange={languageChanged}>
      <Select.Trigger
        className='flex w-fit justify-start space-x-1 border-none font-bold text-zinc-800 transition-colors hover:text-lime-600 dark:text-zinc-200 dark:hover:text-lime-400 md:w-40'
        aria-label={t('Placeholder')}
      >
        <Select.Value placeholder={t('Placeholder')} />
      </Select.Trigger>
      <Select.Content className='relative z-50' position='popper'>
        {locales.map((locale) => {
          console.log('locale', locale);
          const label = capitalize(languageNames.of(locale) ?? locale);
          const option = {
            value: locale,
            label,
          };
          return (
            <Select.Item key={locale} value={locale}>
              <span className='inline-flex select-none items-center space-x-2 font-bold'>
                <span>{label}</span>
              </span>
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

function capitalize(lang: string) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default LocaleSelector;
