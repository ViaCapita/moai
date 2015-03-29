import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  users: null,
  rooms: Ember.computed.alias('sessionUser.messageRooms'),
  sessionUser: null,

  onlineUsers: function() {
    var usersToDisplay = Ember.A(this.get('users'));
    var allPrivateRooms = Ember.A(this.get('rooms').filterBy('isPrivate', true));

    if(!allPrivateRooms.get('content.length')) {
      var me = this.get('session.user');
      usersToDisplay.removeObject(me);
    } 
    else {
      for (var i = allPrivateRooms.get('content.length') - 1; i >= 0; i--) {
        var room = allPrivateRooms.get('content').objectAt(i);
        var people = room.get('people.content');
        usersToDisplay.removeObjects(people.content);
      }      
    }

    return usersToDisplay;
  }.property('users.[]', 'rooms.[]'),

	actions: {
    createRoom: function(user){
      var that = this;
      var sessionUser = that.get('session.user');
      var aRoom = that.store.createRecord('message-room', {
        isPrivate: true,
        people: [user, sessionUser]
      });
      
      aRoom.save().then(function () {
        sessionUser.get('messageRooms').pushObject(aRoom);
        user.get('messageRooms').pushObject(aRoom);
        user.save().then(function () {
          sessionUser.save().then(function () {
            that.get('onlineUsers');
            that.transitionToRoute('chat.room', aRoom);
          });
        });
      });
    },
    logout: function() {
      this.get("session").close();
    }    
	}
});
