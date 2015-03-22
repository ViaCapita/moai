import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
		sendMessage: function () {
      debugger
  		var message = this.store.createRecord('message');
  		message.messageBody = this.get('newMessageBody');
  		message.messageRoom = this.get('model.id');
  		message.sender = this.session.get('user');
  		message.sentAt = Date.now();
      message.save();
      this.get('model').get('messages').pushObject(message);
      // this.set('newMessageBody', "");
		}
	}
});