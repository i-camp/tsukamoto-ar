const packageJson = require('./package.json');

module.exports = {
  swFile: 'service-worker.js',
  staticFileGlobs: [
      '*.html',
      'assets/**/*',
      'css/**/*.css',
      'fonts/**/*',
      'models/**/*',
      'arjs/vendor/three.js/build/three.min.js',
      'arjs/vendor/three.js/examples/js/loaders/MTLLoader.js',
      'arjs/vendor/three.js/examples/js/loaders/OBJLoader.js',
      'arjs/build/ar.js'
  ],
  stripPrefix: '/',
  runtimeCaching: [{
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
      handler: 'cacheFirst'
  },{
    urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com/,
    handler: 'cacheFirst'
}],
  cacheId: packageJson.name,
  verbose: true
};
