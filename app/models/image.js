import DS from 'ember-data';

export default DS.Model.extend({
  url:      DS.attr('string'),
  filename: DS.attr('string'),
  size:     DS.attr('number'),
  width:    DS.attr('number'),
  height:   DS.attr('number'),
  ready:    DS.attr('boolean', {defaultValue: false}),
  user:     DS.belongsTo('user', {
    inverse: 'profileImage'
  }),

  profileUrl: function(){
    var u = this.get('url');

    if(u) {
      return u + "/convert?width=300&height=300&fit=crop";
    } else {
      return false;
    }
  }.property('url'),

  thumbUrl: function(){
    var u = this.get('url');

    if(u) {
      return u + "/convert?width=50&height=50&fit=crop";
    } else {
      return false;
    }
  }.property('url')
});
