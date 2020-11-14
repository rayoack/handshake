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
      table.text('description');
      table
        .boolean('featured_product')
        .defaultTo(false);
    })
  }

  down () {
    this.alter('products', (table) => {
      table.dropColumn('store_id');
      table.dropColumn('description');
      table.dropColumn('featured_product');
    })
  }
}

module.exports = AddColumnStoreIdInProductsSchema