import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return this.store.find('user', { 
      equalTo: this.session.get('uid')
    });
  },
  setupController: function(controller, model){
    controller.set('rooms', this.store.find('message-room'));
    controller.set('model', model);
  },
  actions: {
    createRoom: function(){
      // do something
    }
  }
});