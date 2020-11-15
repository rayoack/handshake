'use strict'

const Database = use('Database');
const Store = use("App/Models/Store");
const StoreSection = use("App/Models/StoreSection");
const storeService = use('App/Services/StoreService');
const Logger = use('Logger');

class StoreSectionController {
  async index ({ request, response, view }) {
  }

  async create ({ request, response, view }) {
    try {
      const data = request.only([
        'name',
        'store_id'
      ]);
  
      const actualStoreSections = await storeService.checkStoreHasSections(data.store_id);

      const storeSection = await StoreSection.create({
        section_index: actualStoreSections.length == 0 ? 0 : actualStoreSections.length,
        ...data
      });
  
      response.status(200).send(storeSection);
      
    } catch (error) {
      response.status(404).send(error.message);
    }
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async updateName ({ params, request, response }) {
    try {
      const data = request.only([
        'name'
      ]);
          
      const storeSection =  await StoreSection.find(params.id);
    
      storeSection.name = data.name;
      
      await storeSection.save();
  
      response.status(200).send(storeSection);
      
    } catch (error) {
      response.status(404).send(error.message);
    }
  }

  async updateSectionIndex({ params, request, response }) {
    try {
      const data = request.only([
        'oldIndex',
        'newSectionIndex',
        'updateType',
        'store_id'
      ]);
          
      const actualStoreSections = await storeService.checkStoreHasSections(data.store_id);
      
      actualStoreSections.sort(( a, b ) => {
        if ( a.section_index < b.section_index ){
          return -1;
        }
        if ( a.section_index > b.section_index ){
          return 1;
        }
        return 0;
      });
      
      const updatedStoreSections = await storeService.updateSectionOrganization(
        actualStoreSections,
        data.oldIndex,
        data.newSectionIndex,
        data.updateType
      );

      for(let i = 0; i < updatedStoreSections.length; i++){
        await Database
          .table('store_sections')
          .where('id', updatedStoreSections[i].id)
          .update('section_index', updatedStoreSections[i].section_index)
      }
  
      response.status(200).send(updatedStoreSections);
      
    } catch (error) {
      response.status(404).send(error.message);
    }
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = StoreSectionController
