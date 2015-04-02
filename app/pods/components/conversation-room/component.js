import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  name: function(){
    var name = this.get('room.name');
    if(this.get('room.isPrivate')){
      var otherUsers = this.get('room.people');
      var lastUser = otherUsers.get('lastObject');
      var firstUser = otherUsers.get('firstObject');
      if(lastUser === this.get('me')){
        name = otherUsers.get('firstObject.fullName'); 
      } else if(firstUser === this.get('me')) {
        name = otherUsers.get('lastObject.fullName'); 
      }      
    }
    return name;
  }.property('room', 'me'),
});
