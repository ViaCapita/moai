import Ember from "ember";

export default Ember.Route.extend({
	model: function(){
		var signin = this.get('store').createRecord('user-signin');
		signin.set("signinDate", new Date());
		return signin;
	}
});