import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function(){
    var _this   = this;
    var storage = JSON.parse(localStorage.getItem("firebase:session::pairsapp"));
    var fb      = new window.Firebase('https://pairsapp.firebaseio.com');

    if (!storage) { return; }

    fb.authWithCustomToken(storage.token, function(error, authData) {
      if (error) {
        alert('BOOM');
      } else {
        console.log("Authenticated successfully with token:", authData);
        var user = _this.get("store").find('user', authData.uid);
        var us   = _this.get('store').createRecord('session');
        us.setProperties({
          user:          user,
          uid:           authData.uid,
          provider:      authData.provider,
          auth:          authData.auth,
          expires:       authData.expires,
          email:         authData.email,
          resetPassword: authData.isTemporaryPassword
        });
        us.save();
        _this.session.set('user', user);
        _this.transitionTo("chat");
      }
    });
  }
});
