const Database = use('Database');
const Logger = use('Logger');

class StoreService {
  async checkStoreHasLogo(userId) {
      try {
        const storeHasImage = await Database
            .table('images')
            .where('logo_store_id', userId);
          
        return storeHasImage;
          
      } catch (error) {
        Logger.error('ERRO!!!', error);
      }
  }

  async checkStoreHasCover(userId) {
    try {
        const storeHasImage = await Database
            .table('images')
            .where('cover_store_id', userId);
            
        return storeHasImage;
            
    } catch (error) {
        Logger.error('ERRO!!!', error);
    }
  }
}

module.exports = new StoreService();
