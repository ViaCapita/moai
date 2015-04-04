import Ember from 'ember';

export default Ember.Controller.extend({
  chat: Ember.inject.controller(),
  sessionUser: Ember.computed.alias('chat.sessionUser'),  
	actions: {
    logout: function() {
      this.get("session").close();
    }    
	}
});
