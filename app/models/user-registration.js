import DS from 'ember-data';

export default DS.Model.extend({
  registeredAt: DS.attr('date'),
  firstName: 	DS.attr('string'),
  lastName: 	DS.attr('string'),
  email: 		DS.attr('string'),
  password: 	DS.attr('string'),
  confirmation: DS.attr('string'),
  uid:    		DS.attr('string'),
  user: 		DS.belongsTo('user', { async: true })
});

  
  