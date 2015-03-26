import Ember from 'ember';
// This will make more sense when this is a routable component
var scrollDown = function(){
  var mylist = Ember.$(".list-demo");

  if (mylist.length > 0){
    var height = mylist[0].scrollHeight;    
    mylist.animate({ scrollTop: height}, 1000 );
  }
};

export default Ember.Controller.extend({
  loggedIn: Ember.computed.alias('session.isConnected'),
  currentRoom: null,
	actions: {
		sendMessage: function () {
      var room = this.get('model');
  		var message = this.store.createRecord('message');
  		message.set('body', this.get('newMessageBody'));
  		message.set('room', room);
      message.set('sender', this.session.get('user.content'));
      message.set('sentAt', new Date());
      message.save().then(() => {
        scrollDown();
        return room.save();
      });
      this.set('newMessageBody', '');
		}
	},

});
