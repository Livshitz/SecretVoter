
global.libx = require('libx.js/bundles/browser.essentials');

if (global._ == null) global._ = libx._;
global.libx.browser.angular = require('libx.js/browser/angular');

if (global.projconfig != null) global.libx._projconfig = global.projconfig;

// Setup log:
libx.log.isDebug = true;
// libx.log.isShowStacktrace = false;

libx.log.verbose('browserify ready');

// global.libx.crypto = require('libx.js/modules/crypto');
global.libx.modules.network = require('libx.js/modules/network');
global.libx.modules.crypto = require('libx.js/modules/crypto');

global._firebase = firebase.initializeApp(projconfig.firebaseConfig);
global.libx.modules.firebase = require('libx.js/modules/firebase')(global._firebase, firebase);
global.libx.browser.userManager = require('libx.js/browser/userManager')(libx.modules.firebase);
