import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.get("session").fetch().then(function(session) {
      if(session.currentUser) {
        this.transitionTo('chat');
      }
    });
  }
});
