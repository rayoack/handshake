'use strict'

const Route = use('Route');

// SigIn and Logout endpoints
Route.post('/sessions', 'SessionController.create');
Route.delete('/sessions/:id', 'SessionController.destroy').middleware('auth');

// Register new user
Route.post('/register', 'UserController.create');

// User endpoints
Route.resource('users', 'UserController')
  .apiOnly()
  .middleware('auth');

Route.resource('/stores', 'StoreController')
  .apiOnly()
  .middleware('auth');

Route.post('/stores', 'StoreController.create')
  .middleware('auth');

Route.post('/products', 'ProductController.create');

Route.resource('/products', 'ProductController').apiOnly();

