/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

/// <reference path="../../dist/all.d.ts" />

import chai = require('chai');
var expect = chai.expect;

import vm = require("vm");
import fs = require("fs");

/* Hack to load the library */

var data = fs.readFileSync(__dirname + '/../../all.js');
vm.runInThisContext(data.toString(), 'all.js');
var data = fs.readFileSync(__dirname + '/../helpers/Objects.js');
vm.runInThisContext(data.toString(), 'Objects.js');
/* end hack */

describe('qxt.core.MProperty', () => {

    it('should observe a property that already have a setter', (done) => {
        var mPropertyTestObject = new test.MPropertyTestObject();
        var isDone = false;
        mPropertyTestObject.observeProperty('getterAndSetter', function (old, value) {
            expect(old).eql('InitfromGet');
            expect(value).eql('new valuefromSetfromGet');
            isDone = true;
            done();
        });
        mPropertyTestObject.getterAndSetter = 'new value';
        if (!done) {
            expect(isDone).eql(true);
        }
    });

    it('should observe a regular property', (done) => {
        var mPropertyTestObject = new test.MPropertyTestObject();
        var isDone = false;
        mPropertyTestObject.observeProperty('regular', function (old, value) {
            expect(old).eql('Init');
            expect(value).eql('new value');

            isDone = true;
            done();
        });
        mPropertyTestObject.regular = 'new value';
        if (!done) {
            expect(isDone).eql(true);
        }
    });
});