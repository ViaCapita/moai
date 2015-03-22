import DS from 'ember-data';

export default DS.Model.extend({
  session:    DS.belongsTo('session'),
  email:   		DS.attr('string'),
  signedInAt: DS.attr('date')
});