import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
		// sendNewMessage: function (messageBody, messageRoom) {
  //   		var message = this.store.createRecord('message');
  //   		message.messageBody = this.get('newMessageBody');
  //   		message.messageRoom = this.get('messageRoom');
  //   		message.sender = this.session.get('user');
  //   		message.sentAt = new Date();
		// },    
    createRoom: function(user){
      var newRoom = this.store.createRecord('message-room', {
        name: "New Room",
      });
      newRoom.get('people').pushObject(user);
      newRoom.save();
      this.set('currentRoom', newRoom);
    }
	}
});