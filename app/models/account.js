import DS from 'ember-data';

export default DS.Model.extend({
  name: 		    DS.attr('string'),
  organization: DS.belongsTo('organization'),
  type: 		    DS.belongsTo('account-type')
});