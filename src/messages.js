let Backbone = require('backbone');
let $ = require('jquery');

let messagesViewTemplate = require('./templates/messages.hbs');
let messageViewTemplate = require('./templates/message.hbs');

class MessagesView extends Backbone.View {
  events() {
    return {
      'click .trigger-close': 'close'
    }
  }

  render() {
    this.$el.html(messagesViewTemplate());
    let that = this;
    let $list = this.$el.find('#messages');
    this.collection.fetch().done(function () {
      that.$el.find('.loading-text').addClass('hide');
      that.$el.find('.trigger-close').removeClass('hide');
      that.collection.forEach((message) => {
        $list.append(new MessageView({model: message}).render().el);
      });
    });
    return this;
  }

  initialize(options) {
    super.initialize(options);
    this.collection = new Messages();
    this.collection.on("reset", this.render, this);
  }

  close(e) {
    e.preventDefault();
    this.$el.find('.message-item').remove();
    $('#threads').removeClass('hide')
  }
}

class MessageView extends Backbone.View {
  tagName() {
    return 'div';
  }

  className() {
    return 'message-item'
  }

  render() {
    this.$el.html(messageViewTemplate(this.model.attributes));
    return this;
  }
}

class Message extends Backbone.Model {
  initialize() {
  }
}

class Messages extends Backbone.Collection {
  initialize(models, options) {
    this.model = Message;
    super.initialize(models, options);
  }

  url() {
    return "http://private-4e3c9d-messenger15.apiary-mock.com/messages?thread_id=1231231"
  }


  parse(data) {
    return data.message;
  }
}

module.exports = MessagesView;