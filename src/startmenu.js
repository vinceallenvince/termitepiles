var handlebars = require('handlebars');

/**
 * Creates a new StartMenu.
 *
 * A start menu allows the user to set parameters
 * before starting the simulation.
 * @constructor
 */
function StartMenu() {}

StartMenu.prototype.init = function(container, opt_labels) {
  if (!container) throw new Error('StartMenu.init requires a "container" argument.');
  this.container = container;

  this.labels = opt_labels ||
      {
        labelTotalWoodChips: 'Total Wood Chips',
        labelTotalTermites: 'Total Termites',
        labelStartButton: 'Start'
      }
};

StartMenu.prototype.render = function(template) {
  this.container.innerHTML = template(this);
};

module.exports = StartMenu;