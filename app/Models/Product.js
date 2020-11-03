'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    store () {
        return this.hasOne('App/Models/Store')
      }
}

module.exports = Product
