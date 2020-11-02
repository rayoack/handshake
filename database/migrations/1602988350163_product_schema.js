'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table
      .text('title')
      .notNullable();
       table
      .string('category', 80)
      .notNullable();
      table
      .boolean('used_product')
      .defaultTo(false)
      table
      .json('colors')
      table
      .integer('quantity')
      table
      .json('features')
       table
      .float('price')
      .notNullable();  
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
