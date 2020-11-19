'use strict'

const Store = use("App/Models/Store");
const StoreUser = use("App/Models/StoreUser");
const Database = use('Database');
const Logger = use('Logger');

class StoreController {
  
  async index ({ request, response, view }) {
    const stores = await Store.all();

    return stores;
  }

  async create ({ request, response }) {
    try {
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
  
      const store = await Store.create(data);

      const userData = request.only(['user_id']);
  
      await StoreUser.create({
        store_id: store.id,
        user_id: userData.user_id,
        profile_type: 'owner'
      });
  
      response.status(200).send(store);
      
    } catch (error) {
      response.status(404).send(error.message);
    }
  }

  async show ({ request, response }) {
    try {
      const store = await Store.findOrFail(request.params.id);
      
      await store.load('logo');
      await store.load('cover');

      response.status(200).send(store);
      
    } catch (error) {
      response.status(404).send(error.message);
    }
  }

  async getTheLatestRegisteredStores ({ request, response }) {
    try {

      const stores = await Store
        .query()
        .with('logo')
        .with('cover')
        .orderBy('created_at','desc')
        .limit(10)
        .fetch();

      response.status(200).send(stores);
    } catch (error) {
      response.status(404).send(error.message);
    }
  }

  // async update ({ params, request, response }) {
  //   const store = await Store.findOrFail(params.id);

  //   const data = request.only([
  //     'name',
  //     'categories',
  //     'description',
  //     'cep',
  //     'adress',
  //     'city',
  //     'state',
  //     'country',
  //     'allows_partners',
  //     'default_partners_percent'
  //   ]);

  //   store.merge(data);

  //   await store.save();

  //   return store;
  // }

  // async destroy ({ params, request, response }) {
  //   const store = await Store.findOrFail(params.id);

  //   await store.delete();
  // }
}

module.exports = StoreController;
