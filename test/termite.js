var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');

var Termite = require('../src/termite');

describe('Termite', function() {

  describe('Basics', function() {

    it('should load.', function() {
      var termite = new Termite();
      expect(termite instanceof Termite).to.be(true);
    });
  });


  describe('Init', function() {

    it('should initialize.', function() {
      var termite = new Termite();
      var fn = function() {
        termite.init();
      }
      expect(fn).to.throwError();

      termite.init({}, {});
    });
  });

});

