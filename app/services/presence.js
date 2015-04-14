import Ember from 'ember';
import config from '../config/environment';
import Firebase from 'firebase';


export default Ember.Service.extend({
  user: null,
  connectionsRef: null,
  lastOnlineRef: null,
  connectedRef: null,

  initialUserSync: function(){
    // since I can connect from multiple devices or browser tabs, we store each connection instance separately
    // any time that connectionsRef's value is null (i.e. has no children) I am offline
    var connectionsRef = new Firebase(config.firebase +'users/'+ this.get('sessionUser.id') +'/connections');
    this.set('connectionsRef', connectionsRef);
    // stores the timestamp of my last disconnect (the last time I was seen online)
    var lastOnlineRef = new Firebase(config.firebase +'users/'+ this.get('sessionUser.id') +'/lastOnline');
    this.set('lastOnlineRef', lastOnlineRef);
    var connectedRef = new Firebase(config.firebase +'.info/connected');
    this.set('connectedRef', connectedRef);
  }.on('init'),

  connectionObserver: function(){
    if (this.get('connectedRef.value') === true) {
      // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
      // add this device to my connections list
      // this value could contain info about the device or a timestamp too
      var con = this.get('connectionsRef').push(true);
      // when I disconnect, remove this device
      con.onDisconnect().remove();
      // when I disconnect, update the last time I was seen online
      this.get('lastOnlineRef').onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
    }
    var connectedRef = this.get('connectedRef');
    var connectionsRef = this.get('connectionsRef');
    var lastOnlineRef = this.get('lastOnlineRef');
    debugger
  }.observes('user'),
});
