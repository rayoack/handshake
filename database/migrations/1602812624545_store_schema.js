'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table
      .string('name', 80)
      .notNullable()
      .unique();
      table
      .json('categories')
      .notNullable();
      table
      .text('description');
      table
      .text('adress')
      .notNullable();
      table
      .string('city', 80)
      .notNullable();
      table
      .string('state', 80)
      .notNullable();
      table
      .string('country', 254)
      .notNullable();
      table
      .boolean('allows_partners')
      .notNullable();
      table
      .integer('default_partners_percent');
      table.timestamps()
      .notNullable();
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
