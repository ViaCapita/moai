import Ember from "ember";

export default Ember.Route.extend({
  model: function(params){
  	var invite = this.get('store').createRecord('user-invitation');
  	invite.set("invitationDate", new Date());
    return invite;
  }
});