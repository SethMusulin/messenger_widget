let Backbone = require('backbone');
let $ = require('jquery');
let Utils = require('./utils');
let threadsViewTemplate = require('./templates/threads.hbs');
let threadViewTemplate = require('./templates/thread.hbs');
let MessagesView = require('./messages');

class ThreadsView extends Backbone.View {
  events() {
    return {
      'click .message-list': 'navigate'
    }
  }

  render() {
    this.$el.html(threadsViewTemplate());
    let that = this;
    let $list = this.$el.find('#threads');
    this.collection.fetch().done(function () {
      that.collection.forEach((thread) => {
        thread.set('date_updated', Utils.formatDate(thread.get('date_updated'), 'smart'));
        $list.append(new ThreadView({model: thread}).render().el);
      });
    });
    return this;
  }

  initialize(options) {
    super.initialize(options);
    this.collection = new Threads();
    this.collection.on("reset", this.render, this);
  }

  navigate(e) {
    e.preventDefault();
    let messages = new MessagesView({el: $('#drawer-content')});
    messages.render();
    $("#drawer-content").animate({"margin-right": 0}, "slow")
  }
}

class ThreadView extends Backbone.View {
  // tagName() {
  //   return 'div';
  // }
  //
  // className() {
  //   return 'thread'
  // }

  render() {
    this.$el.html(threadViewTemplate(this.model.attributes));
    return this;
  }
}

class Thread extends Backbone.Model {
  initialize() {
  }
}

class Threads extends Backbone.Collection {
  initialize(models, options) {
    this.model = Thread;
    super.initialize(models, options);
  }

  url() {
    return "http://private-4e3c9d-messenger15.apiary-mock.com/threads"
  }

  parse(data) {
    return data.thread;
  }
}

module.exports = ThreadsView;