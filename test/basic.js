/* Curlthis / test / basic.js
 * basic test
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var vows = require('vows'),
    assert = require('assert'),
    Curlthis = require('../curlthis.min.js');

vows.describe('basic').addBatch({
    'Curlthis': {
        topic: Curlthis,
        'is undefined': function(topic) {
            assert.equal(topic, undefined);
        },
    }
}).export(module);