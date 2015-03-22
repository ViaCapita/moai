import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return this.store.find('user', {
      orderBy: 'email'
    });
  },
  setupController: function(controller, model){
    controller.set('rooms', this.store.find('message-room', {
      orderBy: 'email'
    }));
    var sessionUser = this.session.get('user');
    model = model.removeObject(sessionUser);
    controller.set('model', model);
  }
});