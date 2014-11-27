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
});