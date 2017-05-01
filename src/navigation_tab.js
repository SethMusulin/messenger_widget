let Backbone = require('backbone');
let $ = require('jquery');
let NavTabTemplate = require('./templates/navigation_tab.hbs');

class NavTabView extends Backbone.View {
  events() {
    return {
    }
  }

  render() {
    this.$el.html(NavTabTemplate);
    return this;
  }

  initialize(options) {
    super.initialize(options);
  }

}

module.exports = NavTabView;