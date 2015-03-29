import Ember from 'ember';

export default Ember.Controller.extend({
  	actions: {
    	updateUser: function(){
	      var sessionUser = this.get('model');
	      sessionUser.save().then(function () {
          this.transitionToRoute('chat');
        });
    	},
      save: function(file){ // we're passing the record up from the file-picker component
        this.set('uploadedImage', file);
      },
      error: function (msg) {
        this.get('errors').pushObject(msg);
      },
      clearErrors: function () {
       this.get('errors').clear();
      }      
  	}
});