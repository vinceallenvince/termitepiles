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
  },

  /**
   * Checks if the passed obj bounds intersect the passed container bounds.
   * @memberOf Utils
   * @param   {Object}     object     An object.
   * @param   {Object}     container  A container.
   * @returns {Boolean}    True if obj bounds intersect container bounds.
   * @throws Will throw an error if obj or container are not passed.
   */
  isInside: function(obj, container) {
    if (!obj || !container) {
      throw new Error('isInside() requires both an object and a container.');
    }

    if (obj.carried || container.carried) {
      return;
    }

    if (typeof container.scale === 'undefined') {
      container.scale = 0;
    }

    if (obj.location.x > container.location.x - container.scale &&
      obj.location.x < container.location.x + container.scale &&
      obj.location.y > container.location.y - container.scale &&
      obj.location.y< container.location.y + container.scale) {
      return true;
    }
  },

  /**
   * Checks if the passed array contains the passed item.
   * @param {Object}    arr   An array
   * @param {Object}    item  An object
   * @throws {Object}   An error if the passed item does not have an id property.
   * @returns {Boolean} True if the array contains the passed item.
   */
  checkInArray: function(arr, item) {
    var check = false;
    if (typeof item.id === 'undefined') {
      throw new Error('checkInArray: passed item must have an id property.');
    }
    for (var i = 0, max = arr.length; i < max; i++) {
      if (arr[i].id === item.id) {
        check = true;
        break;
      }
    }
    return check;
  }

};

module.exports = Utils;
