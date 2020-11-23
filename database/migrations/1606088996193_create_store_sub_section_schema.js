'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStoreSubSectionSchema extends Schema {
  up () {
    this.create('store_sub_sections', (table) => {
      table.increments()
      table
        .string('name', 80)
        .notNullable();
      table
        .integer('sub_section_index')
        .defaultTo(0);
      table
        .integer('store_section_id')
        .unsigned()
        .references('id')
        .inTable('store_sections')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('store_sub_sections')
  }
}

module.exports = CreateStoreSubSectionSchema
