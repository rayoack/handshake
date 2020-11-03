'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {

    users () {
        return this
          .belongsToMany('App/Models/User')
          .pivotTable('store_users')
          .withTimestamps()
      }

    products()
          {
            return this.hasMany('App/Models/Product');
          }
}

module.exports = Store
