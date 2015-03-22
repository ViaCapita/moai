import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
		sendMessage: function () {
      var room = this.get('model');
  		var message = this.store.createRecord('message');
  		message.set('body', this.get('newMessageBody'));
  		message.set('room', room);
  		message.set('sender', this.session.get('user'));
      message.save();
      room.get('messages').pushObject(message);
      this.set('newMessageBody', '');
		}
	}
});