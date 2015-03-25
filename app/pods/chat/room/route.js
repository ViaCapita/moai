import Ember from "ember";

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('message-room', params.room_id);
  },
  setupController: function(controller, model){
    this.store.find('message');
    this.store.find('message-room');
    controller.set('model', model);
  }
});