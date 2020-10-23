'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveUniqueFromUsernameInUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.dropColumn('username');
      table.string('name', 80);
    })
  }

  down () {
    this.alter('users', (table) => {
      table
        .string('username', 80)
        .notNullable()
        .unique();
      table.dropColumn('name');
    })
  }
}

module.exports = RemoveUniqueFromUsernameInUsersSchema
