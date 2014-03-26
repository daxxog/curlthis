/* Curlthis
 * grabs predetermined stuff from the internet
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.Curlthis = factory();
  }
}(this, function() {
    var async = require('async'),
        path = require('path'),
        spawn = require('child_process').spawn,
        argv = require('optimist').argv._,
        packages = {
            'jquery': 'http://code.jquery.com/jquery-1.11.0.min.js',
            'linksify': 'https://raw.githubusercontent.com/daxxog/linksify/master/linksify.min.js'
        };

    if(argv.length > 0) {
        async.each(argv, function(v, cb) {
            if(typeof packages[v] == 'string') {
                spawn('curl', ['-o', path.basename(packages[v]), packages[v]]).on('exit', function(code) {
                    if(code === 0) {
                        cb();
                    } else {
                        cb('[ERROR] curl exited with error code: ' + code);
                    }
                });
            } else {
                cb('[ERROR] Package does not exist: ' + v);
            }
        }, function(err) {
            if(err) {
                console.error(err);
            } else {
                console.log('Sucessfully installed packages: ', argv);
            }
        });
    } else {
        console.log(JSON.stringify(packages));
    }
}));
