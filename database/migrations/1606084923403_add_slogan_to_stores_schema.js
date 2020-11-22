'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddSloganToStoresSchema extends Schema {
  up () {
    this.table('stores', (table) => {
      table.string('slogan');
    })
  }

  down () {
    this.table('stores', (table) => {
      table.dropColumn('slogan');
    })
  }
}

module.exports = AddSloganToStoresSchema
