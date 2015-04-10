import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      sessionUser: this.get("session.currentUser"),
      users: this.store.filter('user', { // live array
        orderBy: 'first'
      }, function () { return true; })
    });
  },
  setupController: function(controller, hash){
    controller.set('sessionUser', hash.sessionUser);
    controller.set('users', hash.users);
    if(hash.sessionUser && hash.sessionUser.get('isNewAccount')) {
      this.transitionTo('profile.edit', hash.sessionUser.id);
    }  
  }
});