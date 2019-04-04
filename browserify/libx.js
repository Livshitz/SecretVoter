
global.libx = require('libx.js/bundles/browser.essentials');
if (global.projconfig != null) global.libx._projconfig = global.projconfig;
if (global._ == null) global._ = libx._;

libx.di.register('angular', require('libx.js/browser/angular'));

// Setup log:
libx.di.inject(log=>{
	log.isDebug = true;
	log.isShowStacktrace = false;
})


// Libx optional modules:
global.libx.modules.network = require('libx.js/modules/network');
// global.libx.modules.crypto = require('libx.js/modules/crypto');
// libx.di.register('callbacks', require('libx.js/modules/callbacks')); 


// Firebase and related modules instantiation:
global._firebase = global.firebase.initializeApp(projconfig.firebaseConfig);
var firebase = require('libx.js/modules/firebase')(global._firebase, global.firebase);
libx.di.register('firebase', firebase);
var userManager = require('libx.js/browser/userManager')(firebase);
libx.di.register('userManager', userManager);


// lodash components:
// libx._.flatMap = require('lodash/flatMap');
// libx._.uniq = require('lodash/uniq');
// libx._.groupBy = require('lodash/groupBy');
// libx._.sumBy = require('lodash/sumBy');
// libx._.merge = require('lodash/merge');
// libx._.sum = require('lodash/sum');
// libx._.array = require('lodash/array');
// libx._.includes = require('lodash/includes');
// libx._.transform = require('lodash/transform');
// libx._.fp = require("lodash/fp");

libx.log.verbose('browserify ready');
