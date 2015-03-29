import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function(){
    var sessionUser = this.get("session.content.currentUser");
     
    if(sessionUser.get('isNewAccount')) {
      this.transitionTo('profile');
    }
  },
  model: function(params){
    return this.store.find('message-room', params.room_id);
  },
  setupController: function(controller, model){
    this.store.find('message');

    users: this.store.filter('message-room', { // live array
        orderBy: 'first'
    }, function () { return true; });
    controller.set('model', model);
  }
});