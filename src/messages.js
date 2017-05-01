let Backbone = require('backbone');
let $ = require('jquery')

let messagesViewTemplate = require('./templates/messages.hbs');
let messageViewTemplate = require('./templates/message.hbs');

class MessagesView extends Backbone.View {
  events(){return {
    'click .close': 'close'}
  }
  render() {
    this.$el.html(messagesViewTemplate());
    this.$el.addClass('show');
    let that = this;
    let $list = this.$el.find('#messages');
    this.collection.fetch().done(function () {
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

  close(){
    this.$el.removeClass('show');
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
    console.log('I got called');
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