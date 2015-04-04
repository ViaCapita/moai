import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});
Router.map(function() {
  this.resource('chat', function() {
    this.route('room', { path: ':room_id' });
  });  
  this.resource('profile', { path: '/profile/:user_id' }, function() {
    this.route('edit');
  });         
});

export default Router;