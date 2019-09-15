import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import backend from 'i18next-xhr-backend';

const i18nConfig = {
  lng: "en",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true
  }
};

i18n
  .use(backend)
  .use(reactI18nextModule)
  .init(i18nConfig, (err, t) => {
    // console.log(t('test:example'));
  });

export default i18n;
