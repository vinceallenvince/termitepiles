var Utils = require('../src/utils');
var expect = require('expect.js');

describe('Utils', function() {

  it('checkExpectedProps should check an expected map of properties against a passed map of properties.', function() {

    var expected = {
      'color': 'string',
      'number': 'number',
      'map': 'object'
    };

    var props = {
      'color': 'red',
      'number': 300,
      'map': {}
    };

    var check = Utils.checkExpectedProps(expected, props);
    expect(check).to.equal(true);

    props = { // missing a property
      'color': 'red',
      'number': 300
    };

    var fn = function() {
      Utils.checkExpectedProps(expected, props);
    };
    expect(fn).to.throwError();

    props = { // property is not the correct type
      'color': 'red',
      'number': '300',
      'map': {}
    };

    fn = function() {
      Utils.checkExpectedProps(expected, props);
    };
    expect(fn).to.throwError();

  });

  it('isInside should check if the passed obj bounds intersect the passed container bounds.', function() {

    var fnA = function() {
      Utils.isInside();
    };
    var fnB = function() {
      Utils.isInside({});
    };
    var fnC = function() {
      Utils.isInside(null, {});
    };

    expect(fnA).to.throwError();
    expect(fnB).to.throwError();
    expect(fnC).to.throwError();

    // carried

    var obj = {
      carried: true,
      scale: null
    };

    var container = {
      carried: true
    };

    expect(Utils.isInside(obj, container)).to.be(undefined);

    // scale

    var obj = {
      location: {
        x: 49,
        y: 50
      }
    };

    var container = {
      location: {
        x: 49,
        y: 50
      }
    };

    expect(Utils.isInside(obj, container)).to.be(undefined);

    // left

    var obj = {
      location: {
        x: 49,
        y: 50
      }
    };

    var container = {
      location: {
        x: 50,
        y: 50
      },
      scale: 1
    };

    expect(Utils.isInside(obj, container)).to.be(undefined);

    container.scale = 2;
    expect(Utils.isInside(obj, container)).to.be(true);

    // right

    var obj = {
      location: {
        x: 51,
        y: 50
      }
    };

    var container = {
      location: {
        x: 50,
        y: 50
      },
      scale: 1
    };

    expect(Utils.isInside(obj, container)).to.be(undefined);

    container.scale = 2;
    expect(Utils.isInside(obj, container)).to.be(true);

    // top

    var obj = {
      location: {
        x: 50,
        y: 49
      }
    };

    var container = {
      location: {
        x: 50,
        y: 50
      },
      scale: 1
    };

    expect(Utils.isInside(obj, container)).to.be(undefined);

    container.scale = 2;
    expect(Utils.isInside(obj, container)).to.be(true);

    // bottom

    var obj = {
      location: {
        x: 50,
        y: 51
      }
    };

    var container = {
      location: {
        x: 50,
        y: 50
      },
      scale: 1
    };

    expect(Utils.isInside(obj, container)).to.be(undefined);

    container.scale = 2;
    expect(Utils.isInside(obj, container)).to.be(true);
  });

  it('Checks if the passed array contains the passed item.', function() {
    var fn = function() {
      Utils.checkInArray([{}], {hello: 'hi'})
    }
    expect(fn).to.throwError();

    var check = Utils.checkInArray([{id: 'you'}, {id: 'me'}], {hello: 'hi', id: 'me'});
    expect(check).to.be(true);
  });

});