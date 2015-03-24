import Ember from "ember";

export default Ember.Route.extend({
  model: function(){
    return this.store.find('user', {
      orderBy: 'first'
    });
  },
  setupController: function(controller, model){
    var sessionUser = this.get('session.user.content');
    controller.set('rooms', sessionUser.get('messageRooms'));
    var users = model.removeObject(sessionUser);
    controller.set('model', users);
  }
});