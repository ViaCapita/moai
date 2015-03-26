import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    var that   = this;
    var storage = JSON.parse(localStorage.getItem("firebase:session::pairsapp"));
    // var localSession = JSON.parse(localStorage.getItem("localSession"));
    var fb      = new window.Firebase('https://pairsapp.firebaseio.com');
    
    if (!storage) { 
      this.transitionTo('signin'); 
    } else 
    if(!that.session.get('user')) {
      fb.authWithCustomToken(storage.token, function(error, authData) {
        if (error) {
          this.transitionTo('signin'); 
        } else {
          console.log("Authenticated successfully with token:", authData);
          var user = that.get("store").find('user', authData.uid);
          var us   = that.get('store').createRecord('session');
          us.setProperties({
            user:          user,
            uid:           authData.uid,
            provider:      authData.provider,
            auth:          authData.auth,
            expires:       authData.expires,
            email:         authData.email,
            resetPassword: authData.isTemporaryPassword
          });
          us.save().then(function () { 
            that.session.set('user', user);
            that.session.set('userSession', us);
            localStorage.setItem("localSession", JSON.stringify(us));
            that.transitionTo("chat");
          });
        }
      });
    }
  }
});
