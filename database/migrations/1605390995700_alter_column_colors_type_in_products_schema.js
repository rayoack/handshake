'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterColumnColorsTypeInProductsSchema extends Schema {
  up () {
    
    this.alter('products', (table) => {
      // alter table
      table
        .string('colors')
        .alter();
    })
  }

  down () {
    this.alter('products', (table) => {
      // reverse alternations
      table
        .json('colors')
        .alter();
    })
  }
}

module.exports = AlterColumnColorsTypeInProductsSchema
