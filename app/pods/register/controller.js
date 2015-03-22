import Ember from 'ember';

var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Ember.Controller.extend({
	passwordError: '',
  	emailValidated: Ember.computed.match('model.email',  emailRegExp),
  	passwordConfirmed: function() {
  		return this.get('model.password') && this.get('model.password') === this.get('model.confirmation');
	}.property('model.password',  'model.confirmation'),
  	passwordValidated: function() {
	  	var str = this.get('model.password');
	    if (!str) {
	        return(false);
	    } else if (str.length < 8) {
	        return(false);
	    } else if (str.length > 50) {
	        return(false);
	    } else if (str.search(/\d/) === -1) {
	        return(false);
	    } else if (str.search(/[a-zA-Z]/) === -1) {
	        return(false);
	    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
	        return(false);
	    }
	    return(true);
	}.property('model.password'),
	
  	actions: {
    	register: function(){
	      var reg = this.get("model");
				var fb = new window.Firebase('https://amber-fire-9286.firebaseio.com');
				var that = this;
				var emailPassword = {
				  	email    : reg.get('email'),
				  	password : reg.get('password')
				};
 
				Ember.run(function(){
					fb.createUser(emailPassword, function(error) {
					  if (error === null) {
					    console.log("User created successfully");
							Ember.run.schedule('actions', this, function(){
								fb.authWithPassword(emailPassword, function(error, authData) {
							  	if (error) {
							    	console.log("Login Failed!", error);
							    	that.set('passwordError', error);
							  	} else {
							    	console.log("Authenticated successfully with payload:", authData);
						      	debugger
						      	var user = that.get("store").createRecord('user', {
						      		id: authData.uid,
						      		email: reg.get('email'),
						      		createdAt: new Date(),
							      	first: reg.get('first'),
						      		last: reg.get('last'),
						      	}).save(); 

							    	var us = that.get('store').createRecord('session');
							    	us.set('user', user);
							    	us.set('uid', authData.uid);
										us.set('provider', authData.provider);
										us.set('auth', authData.auth);
										us.set('expires', authData.expires);
										us.set('email', authData.email);
										us.set('resetPassword', authData.isTemporaryPassword);
										us.save();

							    	that.transitionToRoute("chat");
							    }
							});
						});	
					  } else {
					    console.log("Error creating user:", error);
					  }
					});			
				});

    	}  
  	}
});