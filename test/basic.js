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
        topic: function() {
        	return Curlthis;
        },
        'is a function': function(topic) {
            assert.equal(typeof topic, 'function');
        }
    },
    'Curlthis can install ': {
        topic: function() {
        	return Curlthis(['jquery', 'async'], this.callback);
        },
        'jquery + async': function(topic) {
            assert.equal(topic, undefined);
        }
    }
}).export(module);