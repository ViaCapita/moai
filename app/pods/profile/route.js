import Ember from "ember";

export default Ember.Route.extend({
  model: function(params){
    return this.store.find('person', { 
      orderBy: "username",
      equalTo: params.profile_slug
    }).then(function(person) {
      return person.get('firstObject');
    });
  }
});