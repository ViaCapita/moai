import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  users: null,
  rooms: Ember.computed.alias('sessionUser.messageRooms'),
  sessionUser: null,

  onlineUsers: function() {
    var usersToDisplay = Ember.A(this.get('users'));
    if(this.get('rooms')){
      var allPrivateRooms = Ember.A(this.get('rooms').filterBy('isPrivate', true));
      if(!allPrivateRooms.get('content.length')) {
        var me = this.get("session").fetch().catch(function() {});
        usersToDisplay.removeObject(me);
      } 
      else {
        for (var i = allPrivateRooms.get('content.length') - 1; i >= 0; i--) {
          var room = allPrivateRooms.get('content').objectAt(i);
          var people = room.get('people.content');
          usersToDisplay.removeObjects(people.content);
        }      
      }      
    }
    return usersToDisplay;
  }.property('users.[]', 'rooms.[]'),

	actions: {
    createRoom: function(user){
      var that = this;
      var sessionUser = this.get("session.content.currentUser");
      var aRoom = that.store.createRecord('message-room', {
        isPrivate: true
      });
      aRoom.get('people').pushObject(user);
      aRoom.get('people').pushObject(sessionUser);
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
