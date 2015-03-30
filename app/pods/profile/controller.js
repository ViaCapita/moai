import Ember from 'ember';

export default Ember.Controller.extend({
  	actions: {
    	updateUser: function(){
        let that = this;
	      var sessionUser = that.get('model');
	      sessionUser.save().then(function () {
          that.transitionToRoute('chat');
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