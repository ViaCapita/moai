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
    selectAvatar: function(avatar){
      let that = this;
      if(that.get('allowEdit')){
        var sessionUser = that.get('model');
        sessionUser.set('isNewAccount', false);
        sessionUser.set('avatarImage', avatar);
        sessionUser.save();        
      }
    },
    updateUser: function(){
      let that = this;
      if(that.get('allowEdit')){
        var sessionUser = that.get('model');
        sessionUser.set('isNewAccount', false);
        sessionUser.save().then(function () {
          that.transitionToRoute('chat');
        });        
      }
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