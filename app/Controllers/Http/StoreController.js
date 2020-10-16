'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Store = use("App/Models/Store");
/**
 * Resourceful controller for interacting with stores
 */
class StoreController {
  /**
   * Show a list of all stores.
   * GET stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const store = Store.query()
    .fetch()
   
    return store;
  }

  /**
   * Render a form to be used for creating a new store.
   * GET stores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const data = request.post([
      'name',
      'categories',
      'description',
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

  /**
   * Create/save a new store.
   * POST stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single store.
   * GET stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
     const store = await Store.find(param.id)

     return store;
  }

  /**
   * Render a form to update an existing store.
   * GET stores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update store details.
   * PUT or PATCH stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a store with id.
   * DELETE stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = StoreController
