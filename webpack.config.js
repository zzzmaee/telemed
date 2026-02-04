const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'telemed',
  exposes: {
    './Routes': './src/app/app.routes.ts',
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: false, requiredVersion: '^19.2.0' },
    "@angular/common": { singleton: true, strictVersion: false, requiredVersion: '^19.2.0' },
    "@angular/router": { singleton: true, strictVersion: false, requiredVersion: '^19.2.0' },
  },
});
