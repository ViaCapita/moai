import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    var _this   = this;
    var store  = this.get('store');
    var storage = JSON.parse(localStorage.getItem("firebase:session::pairsapp"));
    var fb      = new window.Firebase('https://pairsapp.firebaseio.com');

    if (!storage) {
      this.transitionTo('signin');
    } else if(!_this.session.get('user')) {
      var promise = new Promise(function(resolve, reject) {
        fb.authWithCustomToken(storage.token, function(error, authData) {
          if (error) {
            _this.transitionTo('signin');
            reject('failed login');
          } else {
            console.log("Authenticated successfully with token:", authData);
            var user = store.find('user', authData.uid);

            user.then(function(user){
              var session   = store.createRecord('session', {
                user:          user,
                uid:           authData.uid,
                provider:      authData.provider,
                auth:          authData.auth,
                expires:       authData.expires,
                resetPassword: authData.isTemporaryPassword
              });
              session.save().then(function () {
                _this.session.set('user', user);
                _this.session.set('userSession', session);
                localStorage.setItem("localSession", JSON.stringify(session));
                _this.transitionTo("chat");
                resolve(true);
              });
            });
          }
        });
      });

      return promise;
    }
  }
});
