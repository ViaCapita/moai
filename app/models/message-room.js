import DS from 'ember-data';
/* global moment */

export default DS.Model.extend({ 
  name:      DS.attr('string'), 
  messages:  DS.hasMany('message', { async: true }), 
  people:    DS.hasMany('user', { async: true }), 
  organization:  DS.belongsTo('organization', { async: true }),
  isPrivate: DS.attr('boolean'),
  oneOnOne: DS.attr('boolean'),
  messageCount: function(){
    var messages = this.get('messages');
    var theirMessages = messages.filterBy('mine', true);
    var now = moment(); 
    var fiveMinAgo = now.subtract(5, 'minutes');
    var recentMessages = theirMessages.filter(function(item) {
      if (moment(item.get('sentAt')) < fiveMinAgo) { return true; }
    });
    return recentMessages.length;
  }.property('messages.@each.mine')
});