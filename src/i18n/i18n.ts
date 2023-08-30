import { join } from 'path';
import {
  AcceptLanguageResolver,
  I18nOptions,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';

const i18n: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname),
    watch: true,
  },
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
};

export default i18n;
