import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
    createRoom: function(user){
      var aRoom = this.store.createRecord('message-room', {
        isPrivate: true
      });
      var sessionUser = this.get('session.user.content');
      // newRoom.get('people').pushObject(user);
      // newRoom.get('people').pushObject(sessionUser);
      aRoom.save();
      user.get('messageRooms').pushObject(aRoom);
      user.save();
      sessionUser.get('messageRooms').pushObject(aRoom);    
      sessionUser.save();  
      this.transitionToRoute('chat.room', aRoom);
    }
	}
});
