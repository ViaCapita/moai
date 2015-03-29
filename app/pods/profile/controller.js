import Ember from 'ember';

export default Ember.Controller.extend({
  	actions: {
    	updateUser: function(){
	      var userUpdate = this.get("model");
	      var sessionUser = this.get('session.user.content');
	      sessionUser.set('first', userUpdate.get('first'));
	      sessionUser.set('last', userUpdate.get('last'));
	      sessionUser.save();
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