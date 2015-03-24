import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});
Router.map(function() {
  this.route('signin'); 
  this.route('register');

  this.resource('my', function() {
    this.resource('chat', function() {
      this.route('room', { path: ':room_id' });
    });       
    this.route('profile');
  });
});

export default Router;