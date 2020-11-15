const Database = use('Database');
const Logger = use('Logger');

class ProductService {
  async checkProductHasImages(productId) {
      try {
        const productHasImage = await Database
            .table('images')
            .where('product_id', productId);
          
        return productHasImage;
          
      } catch (error) {
        Logger.error('ERRO!!!', error);
      }
  }
}

module.exports = new ProductService();
