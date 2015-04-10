/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pairs',
    podModulePrefix: 'pairs/pods',
    firebase: 'https://moai.firebaseio.com/',
    filepickerAPIKey: 'Aak0jm0AZRJufIXzDqgjoz',    
    environment: environment,
    baseURL: '/',
    locationType: 'auto',    
    torii: {
      sessionServiceName: 'session'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' http://api.filepicker.io/v1/filepicker.js https://*.firebaseio.com/",
      'font-src': "'self' https://fonts.gstatic.com",
      'connect-src': "'self' wss://*.firebaseio.com/ https://auth.firebase.com/  http://api.giphy.com/v1/gifs/random",
      'img-src': "'self' https://*.filepicker.io http://s3.amazonaws.com/giphygifs/media/ http://*.giphy.com/media/",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "https://*.filepicker.io https://*.filepicker.io https://*.firebaseio.com/"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
