'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreUserSchema extends Schema {
  up () {
    this.create('store_users', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users');
      table
      .integer('store_id')
      .unsigned()
      .references('id')
      .inTable('stores')
      table
      .string('profile_type', 80)
      .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('store_users')
  }
}

module.exports = StoreUserSchema
