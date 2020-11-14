'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Image extends Model {

    stores () {  
        return this.belongsTo('App/Models/Store')
    }

    users () {  
        return this.belongsTo('App/Models/User')
    }
   
}

module.exports = Image
