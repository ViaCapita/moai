import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      sessionUser: this.get('session.user'),
      users: this.store.find('user', {
        orderBy: 'first'
      })
    });
  },
  setupController: function(controller, hash){
    var sessionUser = hash.sessionUser;   
    controller.set('rooms', sessionUser.get('messageRooms'));
    //TODO filter out users which already have private rooms with this user
    var users = hash.users;
    controller.set('users', users);
  }
});
