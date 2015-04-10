import DS from 'ember-data';

export default DS.Model.extend({ 
  sender: DS.belongsTo('user', { async: true }),
  body:   DS.attr('string'), 
  room:   DS.belongsTo('message-room', { async: true }),
  sentAt: DS.attr('date'),
  giphy:   DS.attr('string'), 
  hangout:   DS.attr('string'), 
  mine: function(){
    var isMine = this.get("session.content.currentUser.id") === this.get('sender.id');
    return isMine;
  }.property('sender')
});