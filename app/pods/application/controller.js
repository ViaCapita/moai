import Ember from 'ember';

var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Ember.Controller.extend({
  currentUser: null,
  passwordError: '',
  emailValidated: Ember.computed.match('model.email',  emailRegExp),
  
  passwordConfirmed: function() {
    return this.get('model.password') && this.get('model.password') === this.get('model.confirmation');
  }.property('model.password', 'model.confirmation'),

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
    clearError: function(){
      this.set('passwordError', null);
    },
    githubAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'github'});
    },
    facebookAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'facebook'});
    },
    twitterAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'twitter'});
    },
    googleAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'google'});
    },
    normalSignin: function() {
      this.set("moaiSignin", true);
    },
    socialSignin: function() {
      this.set("moaiSignin", false);
    }
    // ,
    // authenticate: function(){
    //   if(this.get('valid')){
    //     var _this  = this;
    //     var store  = this.get('store');
    //     var signin = this.get("model");
    //     var fb     = new window.Firebase('https://pairsapp.firebaseio.com');
    //     var emailPassword = {
    //         email:    signin.get('email'),
    //         password: signin.get('password')
    //     };

    //     fb.authWithPassword(emailPassword, function(error, authData) {
    //       if (!error) {
    //         var user = store.find('user', authData.uid);

    //         user.then(function(user) {
    //           var session = store.createRecord('session', {
    //             user:          user,
    //             uid:           authData.uid,
    //             provider:      authData.provider,
    //             auth:          authData.auth,
    //             expires:       authData.expires,
    //             resetPassword: authData.isTemporaryPassword
    //           });
    //           session.save().then(function () {
    //             Ember.run(function(){
    //               _this.session.set('user', user);
    //               _this.session.set('userSession', session);
    //               localStorage.setItem("localSession", JSON.stringify(session));
    //               _this.transitionToRoute("chat");
    //             });
    //           });
    //         });

    //       } else {
    //         console.log("Login Failed!", error);
    //         _this.set('passwordError', error);
    //       }
    //     });
    //   }
    // },

    // register: function(){
    //   var _this         = this;
    //   var store         = this.get("store");
    //   var registration  = this.get("model");
    //   var fb            = new window.Firebase('https://pairsapp.firebaseio.com');
    //   var emailPassword = {
    //       email:    registration.get('email'),
    //       password: registration.get('password')
    //   };

    //   fb.createUser(emailPassword, function(error) {
    //     if (!error) {
    //       fb.authWithPassword(emailPassword, function(error, authData) {
    //         if (!error) {
    //           var user = store.createRecord('user', {
    //             id:        authData.uid,
    //             email:     registration.get('email'),
    //             createdAt: new Date(),
    //             first:     registration.get('first'),
    //             last:      registration.get('last'),
    //           });

    //           user.save().then(function(){
    //             var session = store.createRecord('session', {
    //               user:          user,
    //               uid:           authData.uid,
    //               provider:      authData.provider,
    //               auth:          authData.auth,
    //               expires:       authData.expires,
    //               resetPassword: authData.isTemporaryPassword
    //             });

    //             session.save().then(function () {
    //               Ember.run(function(){
    //                 _this.session.set('user', user);
    //                 _this.session.set('userSession', session);
    //                 localStorage.setItem("localSession", JSON.stringify(session));
    //                 _this.transitionToRoute("chat");
    //               });
    //             });
    //           });
    //         } else {
    //           console.log("Login Failed!", error);
    //           _this.set('passwordError', error);
    //         }
    //       });
    //     } else {
    //       console.log("Create User Failed!", error);
    //     }
    //   });
    // }
  }
});
