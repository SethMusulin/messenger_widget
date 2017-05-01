let $ = require('jquery'),
  Backbone = require('backbone'),
  Handlebars = require('hbsfy/runtime'),
  Marionette = require('backbone.marionette'),
  Cookies = require('js-cookie');

Backbone.$ = $;

let ThreadsView = require('./threads');
let NavTabView= require('./navigation_tab');
let AuthToken= require('./auth_token');

$(function() {
  this.messengerWidget = {
    init(){
      Cookies.set('SMSESSION', 'SMSESSIONCOOKIE');
      let that = this;
      this.auth = new AuthToken();
      this.auth.fetch({
        success: function(token){
          Cookies.remove('SMAPITOKEN');
          Cookies.set('SMAPITOKEN', (token.get('smapi_token')));
          that.navTabView = new NavTabView({el: $('#nav-tab-top')});
          that.navTabView.render();
          that.threadsView = new ThreadsView({el: $('#threads-home')});
          that.threadsView.render();
          console.log('I have retrieved a SMAPI token and it is ' +
            Cookies.get('SMAPITOKEN'))
        },
        error: function(){
          console.log('sorry, there was an error authenticating with the server')
        }
      })
        }
      };

  this.messengerWidget.init()
});
