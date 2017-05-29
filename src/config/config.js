const locales = ['en', 'ru'];

export const availableLocales = (locale) => {
  if (typeof locale === 'string') {
    if (locales.includes(locale.toLowerCase())) {
      return {
        contains: true,
        locale: locale.toLowerCase(),
      };
    }
  }
  return {
    contains: false,
  };
};
