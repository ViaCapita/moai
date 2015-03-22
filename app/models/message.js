import DS from 'ember-data';

export default DS.Model.extend({ 
  sender:       DS.belongsTo('user', { async: true }),
  messageBody:  DS.attr('string'), 
  messageRoom:  DS.belongsTo('message-room', { async: true, inverse: 'messages'  }),
  sentAt:       DS.attr('date')
});