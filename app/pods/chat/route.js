import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      sessionUser: this.get("session").fetch().catch(function() {}),
      users: this.store.filter('user', { // live array
        orderBy: 'first'
      }, function () { return true; })
    });
  },
  setupController: function(controller, hash){
    controller.set('sessionUser', hash.sessionUser);
    var users = hash.users;
    controller.set('users', users);
  }
});
// import Ember from 'ember';

// export default Ember.Route.extend({
//   model: function() {
//     return this.store.find("message");
//   },

//   actions: {
//     createMessage: function() {
//       const handle = this.get("session.currentUser.fullName");
//       const body = this.controller.get("body");

//       let message = this.store.createRecord("message", {handle: handle, body: body});
//       message.save();

//       this.controller.set("body", "");
//     },

//     logout: function() {
//       this.get("session").close();
//     }
//   }
// });
