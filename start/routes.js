'use strict'

const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});

Route.post('/test', 'TestController.index').validator('Test');

Route.post('/sessions', 'SessionController.create');
Route.post('/register', 'UserController.create');

Route.resource('users', 'UserController')
  .apiOnly()
  .middleware('auth');

Route.resource('/stores', 'StoreController')
  .apiOnly()
  .middleware('auth');
