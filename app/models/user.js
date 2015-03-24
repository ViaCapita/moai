import DS from 'ember-data';

export default DS.Model.extend({ 
  email: 	      DS.attr('string'),
  first:        DS.attr('string'),
  last:         DS.attr('string'),
  profileThumb: DS.attr('string'),
  profileImage: DS.belongsTo('image'),
  messageRooms: DS.hasMany('message-room', { async: true, inverse: 'people' }),  
  fullName: function(){
    return this.get('first') + " " + this.get('last');
  }.property('first', 'last'),  
  initial: function(){
    return this.get('first').charAt(0);
  }.property()
});