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

  async checkStoreHasSections(storeId) {
    try {
      const storeHasSections = await Database
        .table('store_sections')
        .where('store_id', storeId);

      return storeHasSections;
            
    } catch (error) {
        Logger.error('ERRO!!!', error);
    }
  }

  updateSectionOrganization(sectionToUpdate, oldIndex, newIndex, type) {
    let newArray = [];
    sectionToUpdate[oldIndex].section_index = newIndex;
    
    if(type == 'increase') {
      newArray = this.increaseSectionIndex(sectionToUpdate, oldIndex, newIndex);
    } else {
      newArray = this.decreaseSectionIndex(sectionToUpdate, oldIndex, newIndex);
    }

    return newArray;
  }

  increaseSectionIndex(selectArray, oldIndex, newIndex) {
    
    let updatedArray = selectArray.filter((item, i) => {
      return i == oldIndex || item.section_index <= newIndex && item.section_index > oldIndex;
    }).map((item, i) => {
      if(i == oldIndex) return item;

      item.section_index = item.section_index - 1;

      return item;
    })

    return updatedArray;
  }

  decreaseSectionIndex(selectArray, oldIndex, newIndex) {

    let updatedArray = selectArray.filter((item, i) => {
      return i == oldIndex || item.section_index >= newIndex && item.section_index < oldIndex;
    }).map((item, i) => {
      if(i == oldIndex) return item;

      item.section_index = item.section_index + 1;

      return item;
    })

    return updatedArray;
  }
}

module.exports = new StoreService();
