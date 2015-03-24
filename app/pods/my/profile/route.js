import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
  	return this.get('store').createRecord('user');
  },
  setupController: function(controller, model){
    model = this.get('session.user.content');
    controller.set('errors', []);
    controller.set('model', model);
  }
});