/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import chai = require('chai');
var expect = chai.expect;

import vm = require("vm");
import fs = require("fs");

/* Hack to load the library */

var data = fs.readFileSync(__dirname+'/../../all.js');
vm.runInThisContext(data.toString(),'all.js');
/* end hack */

describe('qxt.core.BaseObject', () => {

    describe('contructor', () => {
        it('should define a hashCode', (done) => {
            var obj = new qxt.core.BaseObject();
            expect(obj).to.have.property("hashCode")
                .and.to.be.a('string')
                .eql('0-0');
            done();
        });

        it('should increment hashCode', (done) => {
            var obj1 = new qxt.core.BaseObject();
            var obj2 = new qxt.core.BaseObject();
            expect(obj2).to.have.property("hashCode")
                .and.to.be.a('string')
                .not.eql(obj1.hashCode);
            done();
        });
        it('should recycle hashCode', (done) => {
            var obj1 = new qxt.core.BaseObject();
            var obj1HashCode = obj1.hashCode;
            obj1.dispose();
            var obj2 = new qxt.core.BaseObject();
            expect(obj2).to.have.property("hashCode")
                .and.to.be.a('string')
                .eql(obj1HashCode);
            done();
        });
    });
});