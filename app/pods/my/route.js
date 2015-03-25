import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    if(!this.session.get('user')) {
      var localSession = JSON.parse(localStorage.getItem("localSession"));

      if(localSession) {
        this.session.set('userSession', localSession);
        this.session.set('user', this.store.find('user', localSession.uid));
      }
      else {
        this.transitionTo('signin');          
      }
    }
  }
});