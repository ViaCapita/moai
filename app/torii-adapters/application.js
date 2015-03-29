import Ember from "ember";

export default Ember.Object.extend({
  open: function(authorization) {
    return new Ember.RSVP.Promise((resolve) => {
      let user = this.findUser(authorization);

      if(!user){
        user = this.createUser(authorization);
      }
      Ember.run.bind(null, resolve({currentUser: user}));
    });
  },

  createUser: function(authorization){
    let store = this.get("container").lookup("store:main");
    let data  = this.importAccountData(authorization);
    store.unloadAll("user");
    let user  = store.createRecord("user", data);
    user.save().then(function(user) {
      return user;
    });
  },
  findUser: function(authorization){
    let store = this.get("container").lookup("store:main");
    store.find("user", authorization.uid).then(function(user){ 
      return user;
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
    let store = this.get("container").lookup("store:main");
    if(authorization.github) {
      return {
        id: authorization.uid,
        first: authorization.facebook.cachedUserProfile.first_name,
        last: authorization.facebook.cachedUserProfile.last_name,
        gender: authorization.facebook.cachedUserProfile.gender,
        facebookId: authorization.facebook.id
      };  
    } else if(authorization.facebook) {
      return {
        id: authorization.uid,
        first: authorization.facebook.cachedUserProfile.first_name,
        last: authorization.facebook.cachedUserProfile.last_name,
        gender: authorization.facebook.cachedUserProfile.gender,
        facebookId: authorization.facebook.id
      };    
    } else if(authorization.twitter) {
      return {
        id: authorization.uid,
        first: authorization.facebook.cachedUserProfile.first_name,
        last: authorization.facebook.cachedUserProfile.last_name,
        gender: authorization.facebook.cachedUserProfile.gender,
        facebookId: authorization.facebook.id
      };  
    } else if(authorization.google) {
      return {
        id: authorization.uid,
        first: authorization.facebook.cachedUserProfile.first_name,
        last: authorization.facebook.cachedUserProfile.last_name,
        gender: authorization.facebook.cachedUserProfile.gender,
        facebookId: authorization.facebook.id
      };  
    }
  }
});
