import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useMemo, useState } from 'react';

import { LocaleSelect } from '../ui/LocaleSelect';

const LocaleSelector: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { t, i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames(currentLanguage, {
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
    <LocaleSelect.Root value={value.value} onValueChange={languageChanged}>
      <LocaleSelect.Trigger
        className='md:w-30 flex w-fit justify-start space-x-1 border-none font-bold text-zinc-800 transition-colors hover:text-lime-600 dark:text-zinc-200 dark:hover:text-lime-400'
        aria-label={t('Placeholder')}
      >
        <LocaleSelect.Value placeholder={t('Placeholder')} />
      </LocaleSelect.Trigger>
      <LocaleSelect.Content className='relative z-50' position='popper'>
        {locales.map((locale) => {
          let label = capitalize(languageNames.of(locale) ?? locale);
          if (label.startsWith('中文')) label = '中文'; // temporary fix for zh-CN display length
          // const option = {
          //   value: locale,
          //   label,
          // };
          return (
            <LocaleSelect.Item key={locale} value={locale}>
              <span className='inline-flex select-none items-center space-x-2 font-bold'>
                <span>{label}</span>
              </span>
            </LocaleSelect.Item>
          );
        })}
      </LocaleSelect.Content>
    </LocaleSelect.Root>
  );
};

function capitalize(lang: string) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default LocaleSelector;
