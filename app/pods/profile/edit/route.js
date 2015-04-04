import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return this.get("session.content.currentUser");
  },
  setupController: function(controller, model){
    controller.set('errors', []);
    controller.set('model', model);
  }
});