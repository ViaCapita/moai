import DS from 'ember-data';
/* global moment */

export default DS.Model.extend({ 
  name:          DS.attr('string'), 
  messageRooms:  DS.hasMany('message-rooms', { async: true }), 
  people:        DS.hasMany('user', { async: true })
});