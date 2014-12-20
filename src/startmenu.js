var handlebars = require('handlebars');
var utils = require('drawing-utils-lib');
var Workspace = require('./workspace');

/**
 * Creates a new StartMenu.
 *
 * A start menu allows the user to set parameters
 * before starting the simulation.
 * @constructor
 */
function StartMenu() {}

/**
 * Initializes startMenu.
 * @param  {Object}   container             A dom element containing menu.
 * @param  {Function} [opt_startHandler=] A function to run when start button is clicked.
 * @param  {Object}   [opt_labels=]         A map of label names.
 */
StartMenu.prototype.init = function(container, opt_callback, opt_labels) {
  if (!container) throw new Error('StartMenu.init requires a "container" argument.');
  this.container = container;
  this.labels = opt_labels ||
      {
        labelTotalWoodChips: 'Total Wood Chips',
        labelTotalTermites: 'Total Termites',
        labelSensorLength: 'Sensor Length',
        labelStartButton: 'Start'
      }
  this.callback = opt_callback || null;
};

/**
 * Renders menu html.
 * @param  {Function} template A handlebars template.
 */
StartMenu.prototype.render = function(template) {
  this.container.insertAdjacentHTML('beforeend', template(this.labels));
  this.attachEvents();
};

/**
 * Attaches click event to start button.
 */
StartMenu.prototype.attachEvents = function() {
  if (this.callback) {
    var startButton = this.container.querySelector('button');
    utils.addEvent(startButton, 'click', this.handleStartButton.bind(this, this.callback));
  }
};

/**
 * Creates and initializes a new start button.
 */
StartMenu.prototype.handleStartButton = function(callback, e) {
  e.preventDefault(); // TODO: write test for this
  if (!callback) throw new Error('handleStartButton requires callback argument.');
  callback.call(this);
  this.container.innerHTML = '';
};

/**
 * Gets the value from a passed input field.
 * @param {string} id An input element id.
 * @return {number} A numeric value.
 */
StartMenu.prototype.getInputValue = function(id) {
  if (!id) throw new Error('StartMenu.getInputValue requires "id" argument.');
  return parseInt(this.container.querySelector('input[id=' + id +']').value);
};

module.exports = StartMenu;
