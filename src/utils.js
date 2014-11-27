/**
 * Utility functions.
 * @namespace
 */
var Utils = {

  /**
   * Checks an expected map of properties against a passed map of properties.
   * @memberOf Utils
   * @param   {Object}     expected A map of properties.
   * @param   {Object}     props    A map of properties.
   * @returns {Boolean}    True if properties match.
   * @throws Will throw an error if properties do not match.
   */
  checkExpectedProps: function(expected, props) {
    var msg = '';
    for (var i in expected) {
      if (expected.hasOwnProperty(i) &&
            (!props[i] ||
            typeof props[i] !== expected[i])) {
        msg += 'Expected property \"' + i + '\" of type ' + expected[i] + '. ';
      }
    }
    if (msg) throw new Error(msg);
    return true;
  }
};

module.exports = Utils;