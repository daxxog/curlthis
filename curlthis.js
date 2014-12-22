/* Curlthis
 * grabs predetermined stuff from the internet
 * (c) 2014 David (daXXog) Volm ><> + + + <><
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
        request = require('request'),
        stoptime = require('stoptime'),
        pluralize = require('pluralize'),
        watch = stoptime(),
        Curlthis;
    
    Curlthis = function(argv, _cb) {
        request({url: 'https://raw.githubusercontent.com/daxxog/curlthis/master/packages.json', json: true}, function(err, res, packages) {
            if(err) {
                _cb(err);
                console.error('[ERROR] Could not grab package list. res: ', res);
            } else {
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
                            console.log('Sucessfully installed ' + pluralize('package', argv.length), argv, 'in', watch.elapsed() + 'ms.');
                        }

                        _cb(err);
                    });
                } else {
                    console.log(JSON.stringify(Object.keys(packages)));
                }
            }
        });
    };

    return Curlthis;
}));
