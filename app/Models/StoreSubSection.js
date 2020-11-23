'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreSubSection extends Model {
    storeSection () {  
        return this.belongsTo('App/Models/StoreSection')
    }
}

module.exports = StoreSubSection
