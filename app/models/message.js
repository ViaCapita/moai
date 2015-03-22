import DS from 'ember-data';

export default DS.Model.extend({ 
  sender: DS.belongsTo('user', { async: true }),
  body:   DS.attr('string'), 
  room:   DS.belongsTo('message-room', { async: true, inverse: 'messages'  }),
  sentAt: DS.attr('date', { defaultValue: new Date() })
});