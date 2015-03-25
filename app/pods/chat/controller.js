import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  users: null,
  rooms: null,  
  usersWithoutRoom: function() {
    var usersToDisplay = Ember.A(this.get('users'));
    var allRooms = Ember.A(this.get('rooms'));
    for (var i = allRooms.get('content.length') - 1; i >= 0; i--) {
      var room = allRooms.get('content').objectAt(i);
      var people = room.get('people.content');
      usersToDisplay.removeObjects(people.content);
    }
    return usersToDisplay;
  }.property('users', 'rooms').volatile(),

	actions: {
    createRoom: function(user){
      var aRoom = this.store.createRecord('message-room', {
        isPrivate: true
      });
      var sessionUser = this.get('session.user.content');
      aRoom.save();
      user.get('messageRooms').pushObject(aRoom);
      user.save();
      sessionUser.get('messageRooms').pushObject(aRoom);    
      sessionUser.save();  
      this.transitionToRoute('chat.room', aRoom);
    }
	}
});
