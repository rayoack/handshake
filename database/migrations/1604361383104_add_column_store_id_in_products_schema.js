'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnStoreIdInProductsSchema extends Schema {
  up () {
    this.alter('products', (table) => {
      table
      .integer('store_id')
      .unsigned()
      .references('id')
      .inTable('stores');
    })
  }

  down () {
    this.alter('products', (table) => {
      table.dropColumn('store_id');
    })
  }
}

module.exports = AddColumnStoreIdInProductsSchema
