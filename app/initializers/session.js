import session from '../services/session';

export function initialize(container, application) {
    application.register('session:main', session, { singleton: true });
    application.inject('route', 'session', 'session:main');
    application.inject('controller', 'session', 'session:main');
    application.inject('model', 'session', 'session:main');
}

export default {
  name: 'session',
  initialize: initialize
};