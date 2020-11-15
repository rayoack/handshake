'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSectionSchema extends Schema {
  up () {
    this.create('store_sections', (table) => {
      table.increments()
      table
        .string('name', 80)
        .notNullable();
      table
        .integer('section_index')
        .defaultTo(0);
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('store_sections')
  }
}

module.exports = StoreSectionSchema
