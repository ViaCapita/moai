import DS from 'ember-data';

export default DS.Model.extend({ 
  name:     DS.attr('string'), 
  messages: DS.hasMany('message', { async: true }), 
  people:   DS.hasMany('user', { async: true }) 
});