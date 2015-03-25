import DS from 'ember-data';

export default DS.Model.extend({ 
  name:      DS.attr('string'), 
  messages:  DS.hasMany('message', { async: true }), 
  people:    DS.hasMany('user', { async: true }),
  isPrivate: DS.attr('boolean'),
  privateName: function(){
    var name = 'Room';
    var me = this.session.get('user.content.id');
    var otherUsers = this.get('people');
    if(otherUsers.get('lastObject.id') === me){
      name = otherUsers.get('firstObject.fullName'); 
    } else {
      name = otherUsers.get('lastObject.fullName'); 
    }
    return name;
  }.property('people')  
});