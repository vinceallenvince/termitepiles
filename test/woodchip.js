var expect = require('expect.js');
var sinon = require('sinon');
var jsdom = require('jsdom');

var Woodchip = require('../src/woodchip');

describe('Woodchip', function() {

  describe('Basics', function() {

    it('should load.', function() {
      var woodchip = new Woodchip();
      expect(woodchip instanceof Woodchip).to.be(true);
    });
  });

  describe('Init', function() {

    it('should initialize.', function() {
      var chip = new Woodchip();
      var fn = function() {
        chip.init();
      }
      expect(fn).to.throwError();

      chip.init({});
      expect(chip.name).to.be('WoodChip');
      expect(chip.color[0]).to.be(200);
      expect(chip.offsetDistance).to.be(-10);
      expect(chip.offsetAngle).to.be(0);
      expect(chip.beforeStep).to.be(null);

      chip.init({}, {offsetDistance: 100});
      expect(chip.offsetDistance).to.be(100);
    });
  });

  describe('Init', function() {

    it('should initialize.', function() {

    });

  });
});
