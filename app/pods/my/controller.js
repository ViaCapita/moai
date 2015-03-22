import Ember from 'ember';

export default Ember.Controller.extend({
    loggedIn: Ember.computed.alias('session.isConnected')
});