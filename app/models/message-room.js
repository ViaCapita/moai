import DS from 'ember-data';

export default DS.Model.extend({ 
  name:      DS.attr('string'), 
  messages:  DS.hasMany('message', { async: true, inverse: 'room' }), 
  people:    DS.hasMany('user', { async: true, inverse: 'messageRooms' }),
  isPrivate: DS.attr('boolean'),
  privateName: function(){
    var otherUsers = this.get('people').removeObject(this.session.get('user.content'));
    return otherUsers.get('firstObject.fullName'); 
  }.property('people')  
});