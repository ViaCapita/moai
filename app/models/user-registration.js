import DS from 'ember-data';

export default DS.Model.extend({
  first: 	      DS.attr('string'),
  last: 	      DS.attr('string'),
  email: 		    DS.attr('string'),
  password:     DS.attr('string'),
  confirmation: DS.attr('string')
});

  
  