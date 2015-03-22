import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function(){
    if(!this.session.get('user')){
      this.transitionTo('signin');    
    }
  }
});