//jshint node:true, eqnull:true
/*global describe, it, before*/
'use strict';
var fs = require('fs');
var path = require('path');
var esformatter = require('esformatter');
var dotNotation = require('../');
var expect = require('chai').expect;

var TESTS_DIR = './tests';
var FIXTURES_DIR = 'fixtures';
var EXPECTED_DIR = 'expected';

var readFile = function (folder, name) {
    var filePath = path.join(TESTS_DIR, folder, name);
    return fs.readFileSync(filePath).toString();
};

var compare = function (file) {
    var input = readFile(FIXTURES_DIR, file);
    var actual = esformatter.format(input);
    var expected = readFile(EXPECTED_DIR, file);
    expect(actual).to.be.eql(expected);
};

describe('esformatter-dot-notation', function () {
    before(function () {
        esformatter.register(dotNotation);
    });

    describe('all around testing', function () {
        it('should prove the example in readme works', function () {
            compare('basic.js');
        });

        it('should correctly handle an invalid literal', function () {
            compare('invalid.js');
        });

        it('should correctly handle a complex case', function () {
            compare('complex.js');
        });

        it('should correctly handle a nested case', function () {
            compare('nested.js');
        });

        it('should correctly handle an invoking', function () {
            compare('invoke.js');
        });

        it('should correctly handle a property of empty string', function () {
            compare('empty.js');
        });
    });

    xdescribe('integration with esformatter-quotes', function () {
        it('should correctly transform string', function () {
            esformatter.unregister(dotNotation);
            // register plugin
            esformatter.register(require('esformatter-quotes'));
            //jshint quotmark:false
            var str = "someObject['property'] = true;";
            // pass options as second argument
            var output = esformatter.format(str, {
                'quotes': {
                    'type': 'single',
                    'avoidEscape': true
                }
            });
            expect(output).to.eql('someObject.property = true;');
        });
    });
});
