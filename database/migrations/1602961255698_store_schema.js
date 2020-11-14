'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table
        .string('name', 80)
        .notNullable();
      table
        .string('categories')
        .notNullable()
      table.text('description')
      table.bigInteger('cep')
      table.text('adress')
      table.string('city', 80)
      table.string('state', 80)
      table.string('country', 254)
      table
        .boolean('allows_partners')
        .defaultTo(false)
      table
        .integer('default_partners_percent')
        .notNullable() 
      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
