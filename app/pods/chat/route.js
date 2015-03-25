import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      sessionUser: this.store.find('user', this.session.get('userSession.uid')),
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
