'use strict'

const Store = use("App/Models/Store");

class StoreController {
  
  async index ({ request, response, view }) {
    const stores = await Store.all();

    return stores;
  }

  async create ({ request, response, view }) {
    const data = request.only
    ([
      'name',
      'categories',
      'description',
      'cep',
      'adress',
      'city',
      'state',
      'country',
      'allows_partners',
      'default_partners_percent'
    ]);

    const store = Store.create(data);

    return store;
  }

  async show ({ params }) {
    const store = await Store.findOrFail(params.id);

    return store;
  }

  async update ({ params, request, response }) {
    const store = await Store.findOrFail(params.id);

    const data = request.only([
      'name',
      'categories',
      'description',
      'cep',
      'adress',
      'city',
      'state',
      'country',
      'allows_partners',
      'default_partners_percent'
    ]);

    store.merge(data);

    await store.save();

    return store;
  }

  async destroy ({ params, request, response }) {
    const store = await Store.findOrFail(params.id);

    await store.delete();
  }
}

module.exports = StoreController
