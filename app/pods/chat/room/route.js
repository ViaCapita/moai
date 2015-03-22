import Ember from "ember";

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('message-room', {
      id: params.room_id
    });
  }
});