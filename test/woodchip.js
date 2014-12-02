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
      expect(chip.parent).to.be(null);

      chip.init({}, {offsetDistance: 100});
      expect(chip.offsetDistance).to.be(100);
    });
  });

  describe('Step', function() {

    it('should step.', function() {
      var chip = new Woodchip();
      var fn = sinon.spy();
      var parent = {
        angle: 30,
        location: {
          x: 100,
          y: 100
        }
      };
      chip.init({});
      chip.parent = parent;
      chip.step();

      expect(Math.floor(chip.location.x)).to.be(91);
      expect(Math.floor(chip.location.y)).to.be(95);

      chip.offsetDistance = 0;
      chip.step();
      expect(Math.floor(chip.location.x)).to.be(100);
      expect(Math.floor(chip.location.y)).to.be(100);

      chip.init({}, {
        beforeStep: fn
      });
      chip.parent = null;
      chip.location.x = 200;
      chip.location.y = 200;
      chip.step();
      expect(fn.called).to.be(true);
      expect(chip.location.x).to.be(200);
      expect(chip.location.y).to.be(200);
    });

  });
});
