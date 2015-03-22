import DS from 'ember-data';

export default DS.Model.extend({ 
  email: 	      DS.attr('string'),
  first:        DS.attr('string'),
  last: 	      DS.attr('string'),
  room:         DS.belongsTo('message-room', { async: true, inverse: 'messages'  }),  
  fullName: function(){
    return this.get('first') + " " + this.get('last');
  }.property('first', 'last')
});