const { paths } = require('react-app-rewired');
const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
    '@containers': path.resolve(__dirname, `${paths.appSrc}/containers/`),
    '@constants': path.resolve(__dirname, `${paths.appSrc}/constants/`),
    '@i18n': path.resolve(__dirname, `${paths.appSrc}/i18n/`),
    '@redux': path.resolve(__dirname, `${paths.appSrc}/redux/`),
    '@assets': path.resolve(__dirname, `${paths.appSrc}/assets/`),
    '@helper': path.resolve(__dirname, `${paths.appSrc}/helper/`),
    '@hoc': path.resolve(__dirname, `${paths.appSrc}/hoc/`)
  })(config, env);
  return config;
};
