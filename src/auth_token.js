let Backbone = require('backbone');
let $ = require('jquery');

let messagesViewTemplate = require('./templates/messages.hbs');
let messageViewTemplate = require('./templates/message.hbs');



class AuthToken extends Backbone.Model {

  url() {
    return "http://private-fa03eb-smapitoken.apiary-mock.com/smapi-token"
  }

}
module.exports = AuthToken;

