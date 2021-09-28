module.exports = function override(config) {
  // disable manifest
  config.plugins = config.plugins.filter(
    plugin => plugin.constructor.name !== 'ManifestPlugin'
  );

  return config;
};