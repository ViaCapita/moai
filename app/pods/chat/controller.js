import Ember from 'ember';

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
    createRoom: function(user){
      var newRoom = this.store.createRecord('message-room', {
        name: user.get('fullName') + " Room",
      });

      newRoom.get('people').pushObject(user);
      newRoom.get('people').pushObject(this.session.get('user'));
      newRoom.save();
      this.set('currentRoom', newRoom.id);
    }
	}
});