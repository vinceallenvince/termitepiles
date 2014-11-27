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
 * @param  {Object} container  A dom element containing menu.
 * @param  {Object} opt_labels A map of label names.
 */
StartMenu.prototype.init = function(container, opt_labels) {
  if (!container) throw new Error('StartMenu.init requires a "container" argument.');
  this.container = container;

  this.labels = opt_labels ||
      {
        labelTotalWoodChips: 'Total Wood Chips',
        labelTotalTermites: 'Total Termites',
        labelSensorLength: 'Sensor Length',
        labelStartButton: 'Start'
      }
};

/**
 * Renders menu html.
 * @param  {Function} template A handlebars template.
 */
StartMenu.prototype.render = function(template) {
  this.container.innerHTML = template(this.labels);
};

/**
 * Attaches click event to start button.
 */
StartMenu.prototype.attachEvents = function() {
  var startButton = this.container.getElementById('startButton');
  utils.addEvent(startButton, 'click', this.handleStartButton.bind(this));
};

/**
 * Creates and initializes a new start button.
 */
StartMenu.prototype.handleStartButton = function() {
  var workspace = new Workspace();
  workspace.init({
    totalWoodChips: this.getInputValue('totalWoodChips'),
    totalTermites: this.getInputValue('totalTermites'),
    sensorLength: this.getInputValue('sensorLength')
  });
};

/**
 * Gets the value from a passed input field.
 * @param {string} id An input element id.
 * @return {number} A numeric value.
 */
StartMenu.prototype.getInputValue = function(id) {
  if (!id) throw new Error('StartMenu.getInputValue requires "id" argument.');
  return parseInt(this.container.getElementById(id).value);
};

module.exports = StartMenu;
