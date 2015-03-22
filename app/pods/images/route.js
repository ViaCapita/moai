import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.find('file-picker-image').then(function(images) {
      return images;
    });
  },
  setupController: function (controller, model) {
    controller.set('errors', []);
    controller.set('model', model);
  }
});
