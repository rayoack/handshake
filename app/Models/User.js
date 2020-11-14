/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });

    this.addTrait('SoftDelete');
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  /**
   * Hidden fields for user model.
   *
   * @return [Array]
   */
  static get hidden() {
    return ['password'];
  }

  stores () {  
    return this
      .belongsToMany('App/Models/Store')
      .pivotTable('store_users')
      .withTimestamps()
  }

  avatar () {
    return this.hasOne('App/Models/Image', 'id', 'avatar_user_id')
  }

  cover () {
    return this.hasOne('App/Models/Image', 'id', 'cover_user_id')
  }
}

module.exports = User;
