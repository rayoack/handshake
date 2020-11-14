'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.text('file_name');
      table
        .integer('avatar_user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('cover_user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('logo_store_id')
        .unsigned()
        .references('id')
        .inTable('stores');
      table
        .integer('cover_store_id')
        .unsigned()
        .references('id')
        .inTable('stores');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products');
      table.integer('product_image_index');
      table.text('image_url');
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
