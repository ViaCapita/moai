import Ember from 'ember';

var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Ember.Controller.extend({
  requested: false,
  errorMessage: "",
  emailValidated: Ember.computed.match('model.email',  emailRegExp),
  actions: {
    requestInvite: function(){
      var invite = this.get("model");
      if(this.get('emailValidated')){
	      invite.save();
	      this.set("errorMessage", "");
	      this.set("requested", true);      	
      }
      else
      {
      	this.set("errorMessage", "This does not look like an email address");
      }

    }  
  }
});