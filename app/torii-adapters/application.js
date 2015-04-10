import Ember from "ember";

export default Ember.Object.extend({
  open: function(authorization) {
    let store = this.get("container").lookup("store:main");
    let that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      store.find("user", authorization.uid).then(function(user) {
        console.log('User Found:', user);
        Ember.run.bind(null, resolve({currentUser: user}));
      }, function() {
        let data  = that.importAccountData(authorization);
        store.unloadAll("user");
        let newUser  = store.createRecord("user", data);
        newUser.save().then(function(nuser) {
          console.log('New User Set into Session:', nuser);
          Ember.run.bind(null, resolve({currentUser: nuser}));
        }, function() {
          console.log('No User Found');
          Ember.run.bind(null, reject("no user"));
        });
      });
    });
  },

  fetch: function() {
    let firebase = this.get("container").lookup("adapter:application").firebase;
    let authData = firebase.getAuth();
    let store = this.get("container").lookup("store:main");

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(authData) {
        store.find("user", authData.uid).then(function(user) {
          Ember.run.bind(null, resolve({currentUser: user}));
        }, function() {
          Ember.run.bind(null, reject("no session"));
        });
      } else {
        Ember.run.bind(null, reject("no session"));
      }
    });
  },

  reload: function() {
    let firebase = this.get("container").lookup("adapter:application").firebase;
    let localSession = JSON.parse(localStorage.getItem("firebase:session::moai"));
    let store = this.get("container").lookup("store:main");
    let _this   = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(localSession && !_this.session.get('currentUser')) {
        firebase.authWithCustomToken(localSession.token, function(error, authData) {
          if(authData) {
            store.find("user", authData.uid).then(function(user) {
              Ember.run.bind(null, resolve({currentUser: user}));
            }, function() {
              Ember.run.bind(null, reject("no session"));
            });
          } else {
            Ember.run.bind(null, reject("no session"));
          }
        }); 
      }
    });
  },

  close: function() {
    let firebase = this.get("container").lookup("adapter:application").firebase;
    let store = this.get("container").lookup("store:main");

    return new Ember.RSVP.Promise(function(resolve) {
      store.unloadAll("user");
      store.unloadAll("message");
      store.unloadAll("message-room");
      store.unloadAll("organization");
      store.unloadAll("image");
      firebase.unauth();
      resolve({currentUser: null});
    });
  },

  importAccountData: function(authorization) {
    if(authorization.github) {
      return {
        id: authorization.uid,
        email: authorization.github.cachedUserProfile.email,
        githubUsername: authorization.github.username,
        provider: authorization.provider,
        isNewAccount: true
      };  
    } else if(authorization.facebook) {
      return {
        id: authorization.uid,
        first: authorization.facebook.cachedUserProfile.first_name,
        last: authorization.facebook.cachedUserProfile.last_name,
        gender: authorization.facebook.cachedUserProfile.gender,
        facebookId: authorization.facebook.id,
        provider: authorization.provider,
        isNewAccount: true
      };    
    } else if(authorization.twitter) {
      return {
        id: authorization.uid,
        first: authorization.twitter.displayName.split(' ').slice(0, -1).join(' '),
        last: authorization.twitter.displayName.split(' ').slice(-1).join(' '),
        twitterUsername: authorization.twitter.username,
        provider: authorization.provider,
        isNewAccount: true
      };  
    } else if(authorization.google) {
      return {
        id: authorization.uid,
        first: authorization.google.cachedUserProfile.given_name,
        last: authorization.google.cachedUserProfile.family_name,
        provider: authorization.provider,
        isNewAccount: true
      };  
    }
  }
});
