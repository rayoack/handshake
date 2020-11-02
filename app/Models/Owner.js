'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Owner extends Model {

    users()
    {
        return this
        .belongsToMany('App/Models/Users')
        .pivotTable('user_id');
    }
    
    stores()
    {
        return this 
        .belongsToMany('App/Models/Stores')
        .pivotTable('store_id');
    }

}


module.exports = Owner
