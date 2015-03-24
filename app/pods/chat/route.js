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

    var users = hash.users.removeObject(sessionUser);
    controller.set('users', users);
  }
});
