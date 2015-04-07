import DS from 'ember-data';

export default DS.Model.extend({ 
  url:  DS.attr('string'),
  imageUrl: function(){
    return '/avatar-icons/' + this.get('url');
  }.property('url')
});