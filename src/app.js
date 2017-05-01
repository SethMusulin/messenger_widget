let $ = require('jquery'),
  Backbone = require('backbone'),
  Handlebars = require('hbsfy/runtime'),
  Marionette = require('backbone.marionette');

Backbone.$ = $;

let ThreadsView = require('./threads');

$(function() {
  this.threadsView = new ThreadsView({el: $('.threads-list')});
  this.threadsView.render();
});
