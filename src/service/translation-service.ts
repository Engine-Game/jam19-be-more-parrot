import i18n from 'i18next';
import i18nBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18nXHRBackend from 'i18next-xhr-backend';

/**
 * Initializes i18next and creates an instance
 */
async function loadLocales() {
  // tslint:disable-next-line:no-floating-promises
  i18n
  .use(i18nBrowserLanguageDetector)
  .use(i18nXHRBackend)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: '../../locales/{{lng}}/{{ns}}.json'
    },
    preload: ['en'],
    load: 'languageOnly',
    debug: true
  });
}

/**
 * i18next entry point that takes in a translation key to be used as a lookup
 * returns the object assigned to the key.
 */
function translate(key: string): (string | string[]) {
  return key !== '' ?
    i18n.t(key, { returnObjects: true }) : key;

}

/**
 * Distinctive method to imply that the method should return a string[]
 * @param key the translation key to be resolved
 */
function translateToArray(key: string): string[] {
  return <string[]> translate(key);
}

/**
 * Entry point: resolves a translation key to a name format of string
 * @param key the key to be resolved
 */
function translateName(key: string): string {
  return <string> translate(key);
}

/**
 * Entry point: resolves a translation key to a descriptions format of string[]
 * @param key the key to be resolved
 */
function translateDescriptions(key: string): string[] {
  return <string[]> translateToArray(key);
}

/**
 * Entry point: resolves a translation key to a combination format of combinations: { id: number; text: string }[]
 * @param combinations a combination object containing "id" of combination and the translation "key"
 */
function translateCombinations(combinations: { id: number; text: string }[]) {
  return combinations.map(combination => {

    if (combination.id && combination.text && combination.text.length) {
      const result: {} = translateToArray(combination.text);
      return {
        id: combination.id,
        ...result
      };
    }
    return combination;
  });
}

export {
  loadLocales,
  translateName,
  translateDescriptions,
  translateCombinations
};
