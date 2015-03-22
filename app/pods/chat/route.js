import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return this.store.find('user', {
      orderBy: 'email'
    });
  },
  setupController: function(controller, model){
    controller.set('rooms', this.store.find('message-room'));
    controller.set('model', model);
  }
});