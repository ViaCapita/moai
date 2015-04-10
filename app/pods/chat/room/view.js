import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    this._super();

    var mylist = Ember.$(".list-demo");
    if (mylist.length > 0){
      var height = mylist[0].scrollHeight;    
      mylist.animate({ scrollTop: height}, 1000 );
    }

  }
});