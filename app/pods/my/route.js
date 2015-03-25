import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function() {
    if(!this.session.get('user')) {
      var localSession = JSON.parse(localStorage.getItem("localSession"));

      if(localSession.user) {
        this.session.set('user', localSession.user);
      }
      else {
        this.transitionTo('signin');          
      }
    }
  }
});