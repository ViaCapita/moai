import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
    findaRoom: function(user){
      var newRoom = this.store.createRecord('message-room', {
        isPrivate: true
      });
      var sessionUser = this.get('session.user.content');
      newRoom.get('people').pushObject(user);
      newRoom.get('people').pushObject(sessionUser);
      newRoom.save();
      //Below I am adding 2 rooms one which gets destroyed immediately???
      user.get('messageRooms').pushObject(newRoom);
      user.save();
      //Below I am adding 2 rooms one which gets destroyed immediately???
      sessionUser.get('messageRooms').pushObject(newRoom);
      sessionUser.save();
      this.transitionToRoute('chat.room', newRoom);
    }
	}
});