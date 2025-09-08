const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure Firebase packages that publish .cjs files resolve under Hermes
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

// Workaround for some packages exporting via package.json exports
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

