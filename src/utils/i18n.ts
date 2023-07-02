import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPropsTranslations = async (locale: string) => {
  return {
    ...(await serverSideTranslations(locale, ['common', 'animals'])),
  };
};
