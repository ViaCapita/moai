import DS from 'ember-data';

export default DS.Model.extend({
  email: 	              DS.attr('string'),
  first:                DS.attr('string'),
  last:                 DS.attr('string'),
  gender:               DS.attr('string'),
  locale:               DS.attr('string'),
  timezone:             DS.attr('number'),
  provider:             DS.attr('string'),
  githubUsername:       DS.attr('string'),  
  showGithubUsername:   DS.attr('boolean'),
  twitterUsername:      DS.attr('string'),  
  showTwitterUsername:  DS.attr('boolean'),
  showTweets:           DS.attr('boolean'),
  facebookId:           DS.attr('string'),
  showfacebookLink:     DS.attr('boolean'),
  googleId:             DS.attr('string'), 
  avatarImage:          DS.attr('string'),  
  showGoogleLink:       DS.attr('boolean'),
  profileImage: DS.belongsTo('image',{async: true}),
  messageRooms: DS.hasMany('message-room', { async: true }),
  fullName: function(){
    return this.get('first') + " " + this.get('last');
  }.property('first', 'last'),
  initial: function(){
    return this.get('first').charAt(0) + this.get('last').charAt(0) ;
  }.property(),
  avatar: function(){
    return this.get('profileImage') ? this.get('profileImage') : this.get('avatarImage');
  }.property()
});
