import Ember from 'ember';

export default Ember.Controller.extend({
  chat: Ember.inject.controller(),
  sessionUser: Ember.computed.alias('chat.sessionUser'),

  allowEdit: function(){
    var allow = false;
    if(this.get('sessionUser') === this.get('model')) {
      allow = true;
    }
    return allow;
  }.property('model'),  
  
  actions: {
    logout: function() {
      this.get("session").close();
      this.transitionToRoute('index');
    }    
	}
});
