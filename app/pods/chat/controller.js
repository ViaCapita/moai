import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  users: null,
  rooms: Ember.computed.alias('sessionUser.messageRooms'),
  sessionUser: null,

  allUsersButMe: function() {
    var allButMe = Ember.A(this.get('users'));
    allButMe.removeObject(this.get('sessionUser'));
    return allButMe;
  }.property('users.[]'),

  onlineUsers: function() {
    var usersToDisplay = this.get('allUsersButMe');
    var usersRooms = Ember.A(this.get('rooms'));
    if(usersRooms.get('length')){
      for (var i = usersRooms.get('length') - 1; i >= 0; i--) {
        var room = usersRooms.objectAt(i);
        var people = room.get('people');
        console.log('number:', people.get('length'));
        for (var p = people.get('length') - 1; p >= 0; p--) {
          usersToDisplay = usersToDisplay.removeObject(people.objectAt(p));
        }
      }         
    }
      
    return usersToDisplay;
  }.property('users.[]', 'rooms.[]').volatile(),

	actions: {
    createRoom: function(isPrivate, oneOnOne, user){
      var that = this;
      var sessionUser = this.get("session.content.currentUser");
      var aRoom = that.store.createRecord('message-room', {
        isPrivate: isPrivate,
        oneOnOne: oneOnOne
      });
      aRoom.get('people').pushObject(sessionUser);
      if(user){
        aRoom.get('people').pushObject(user);        
      }
      aRoom.save().then(function () {
        sessionUser.get('messageRooms').pushObject(aRoom);
        sessionUser.save().then(function () {
          if(user){
            user.get('messageRooms').pushObject(aRoom);
            user.save().then(function () {
              that.get('onlineUsers');
              that.transitionToRoute('chat.room', aRoom);
            });
          } 
          else {
            that.get('onlineUsers');
            that.transitionToRoute('chat.room', aRoom);            
          }
        });
      });

    },
    logout: function() {
      this.get("session").close();
      this.transitionToRoute('index');
    }    
	}
});
