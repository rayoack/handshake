'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StoreSection extends Model {
    store () {  
        return this.belongsTo('App/Models/Store')
    }

    storeSubSection () {  
        return this.belongsTo('App/Models/StoreSubSection')
    }
}

module.exports = StoreSection
