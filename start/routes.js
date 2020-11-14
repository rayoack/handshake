'use strict'

const Route = use('Route');

// SignIn and Logout endpoints
Route.post('/sessions', 'SessionController.create');
Route.delete('/sessions/:id', 'SessionController.destroy').middleware('auth');

// Register new user
Route.post('/register', 'UserController.create');

// User endpoints
Route.resource('users', 'UserController')
  .apiOnly()
  .middleware('auth');

// Store endpoints
Route.post('/stores', 'StoreController.create')
  .middleware('auth');

Route.resource('stores', 'StoreController')
  .apiOnly()
  .middleware('auth');

// Products endpoints
Route.post('/products', 'ProductController.create').middleware('auth');
Route.resource('/products', 'ProductController').apiOnly();

// Image endpoints
Route.post('/user/picture/:id/:type', 'ImageController.addUserImage').middleware('auth');
Route.post('/store/picture/:id/:type', 'ImageController.addStoreImage').middleware('auth');
