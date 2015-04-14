import Ember from 'ember';


// This will make more sense when this is a routable component
var scrollDown = function(){
  var mylist = Ember.$(".list-demo");
  if (mylist.length > 0){
    var height = mylist[0].scrollHeight;    
    mylist.animate({ scrollTop: height}, 1000 );
  }
};

var url = '//api.giphy.com/v1/gifs/random',
    key = 'dc6zaTOxFJmzC';

export default Ember.Controller.extend({
  chat: Ember.inject.controller(),
  sessionUser: Ember.computed.alias('chat.sessionUser'),

  otherPerson: function(){
    if(this.get('model')){
      if(this.get('model.people.firstObject') !== this.get('sessionUser')) {
        return this.get('model.people.firstObject');
      } 
      else {
        return this.get('model.people.lastObject');
      }
    }
    else {
      return null;
    }
  }.property('model', 'sessionUser'),

  saveMessage: function(messageText, room){
    var message = this.store.createRecord('message');
    message.set('body', messageText);    
    var allWords = messageText.split(' ');
    var restOfWords = null;
    if(allWords.length > 1){
      restOfWords = allWords.slice(0);
      restOfWords.shift();
      restOfWords = restOfWords.join(' ');   
    }
    
    if (allWords[0] === "@hangout") {
      this.saveHangoutMessage(message, room);
    } else if (allWords[0] === "@gif") {
      this.saveGiphyMessage(restOfWords, message, room);
    } else {
      message.set('room', room);
      message.set('sender', this.get("session.currentUser"));
      message.set('sentAt', new Date());
      message.save().then(() => {
        scrollDown();
        return room.save();
      });      
    }
  },

  saveGiphyMessage: function(term, message, room) {
    var that = this;
    var newGif = null;
    var params = { tag: term, api_key: key };
    Ember.$.getJSON(url, params)
      .then(function(response) {
        if(response && response.data && response.data.fixed_height_downsampled_url) {
          newGif = response.data.fixed_height_downsampled_url;       
        } else {
          message.set('error', 'Cannot create gif at this time.');   
        }
        message.set('giphy', newGif);
        message.set('room', room);
        message.set('sender', that.get("session.currentUser"));
        message.set('sentAt', new Date());
        message.save().then(() => {
          scrollDown();
          return room.save();
        });         
      });
  },

  saveHangoutMessage: function(message, room){
    var url = 'https://hangoutsapi.talkgadget.google.com/hangouts/_?gid=988654388708';
    message.set('hangout', url);       
    message.set('room', room);
    message.set('sentAt', new Date());
    message.save().then(() => {
      scrollDown();
      return room.save();
    });      
  },

	actions: {
		sendMessage: function () {
      var messageText = this.get('newMessageBody');
      this.saveMessage(messageText, this.get('model'));
      this.set('newMessageBody', '');
		}
	},

});
