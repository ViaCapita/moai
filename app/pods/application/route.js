import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var session = this.get("session").fetch().catch(function() {});
    if(session) {
      this.transitionTo('chat');
    }
    return session;
  }
});
