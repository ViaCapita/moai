import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      sessionUser: this.store.find('user', this.get('session.userSession.uid')),
      users: this.store.find('user', {
        orderBy: 'first'
      })
    });      
  },
  setupController: function(controller, hash){
    var sessionUser = hash.sessionUser;   
    controller.set('sessionUser', hash.sessionUser);
    
    //TODO filter out users which already have private rooms with this user
    var users = hash.users;
    controller.set('users', users);
  }
});
