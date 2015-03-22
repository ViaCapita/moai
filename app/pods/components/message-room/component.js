import Ember from "ember";

export default Ember.Component.extend({
    messageRoom: null,
    newMessageBody: "",
  	actions: {
    	sendnewMessage: function () {
    		this.sendAction(this.get('newMessageBody'), this.get('messageRoom'));
    		this.set('newMessageBody', "")
		}
	}
});
