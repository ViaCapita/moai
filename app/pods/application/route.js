import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var session = this.get("session").fetch().catch(function() {});
    if(session.currentUser) {
      this.transitionTo('chat');
    }
    return session;
  }
});
