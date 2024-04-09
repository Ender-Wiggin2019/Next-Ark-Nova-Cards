// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN', 'de'],
    localeDetection: true,
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./public/locales')
      : '/locales',
  localeStructure: '{{lng}}/{{ns}}',
  reloadOnPrerender: process.env.NODE_ENV === 'development',

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  saveMissing: true,
  // strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
};
