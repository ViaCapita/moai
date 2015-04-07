import Ember from 'ember';

export default Ember.Controller.extend({
            
  actions: {
    githubAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'github'}).then(() => {
        if(this.get('session.currentUser')) {
          localStorage.setItem("sessionUser", JSON.stringify(this.get('session.currentUser')));
          this.transitionToRoute('chat');
        }
      });
    },
    facebookAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'facebook'}).then(() => {
        if(this.get('session.currentUser')) {
          localStorage.setItem("sessionUser", JSON.stringify(this.get('session.currentUser')));
          this.transitionToRoute('chat');
        }
      });
    },
    twitterAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'twitter'}).then(() => {
        if(this.get('session.currentUser')) {
          localStorage.setItem("sessionUser", JSON.stringify(this.get('session.currentUser')));
          this.transitionToRoute('chat');
        }
      });
    },
    googleAuthenticate: function() {
      this.get("session").open("firebase", { authWith: 'google'}).then(() => {
        if(this.get('session.currentUser')) {
          localStorage.setItem("sessionUser", JSON.stringify(this.get('session.currentUser')));
          this.transitionToRoute('chat');
        }
      });
    }
  }
});
