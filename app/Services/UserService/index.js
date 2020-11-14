const Database = use('Database');
const Logger = use('Logger');

class UserService {
  async checkUserHasAvatar(userId) {
      try {
        const userHasImage = await Database
            .table('images')
            .where('avatar_user_id', userId);
          
        return userHasImage;
          
      } catch (error) {
        Logger.error('ERRO!!!', error);
      }
  }

  async checkUserHasCover(userId) {
    try {
        const userHasImage = await Database
            .table('images')
            .where('cover_user_id', userId);
            
        return userHasImage;
            
    } catch (error) {
        Logger.error('ERRO!!!', error);
    }
  }
}

module.exports = new UserService();
