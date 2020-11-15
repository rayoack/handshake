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
      
    logo () {
        return this.hasOne('App/Models/Image', 'id', 'logo_store_id')
    }

    cover () {
        return this.hasOne('App/Models/Image', 'id', 'cover_store_id')
    }
    
    products () {
        return this.hasMany('App/Models/Product');
    }
    
    storeSections () {
        return this.hasMany('App/Models/StoreSection');
    }
}

module.exports = Store
