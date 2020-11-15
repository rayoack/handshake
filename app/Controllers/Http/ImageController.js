'use strict'
const Database = use('Database');
const Image = use('App/Models/Image');
const uploadService = use('App/Services/UploadService');
const userService = use('App/Services/UserService');
const storeService = use('App/Services/StoreService');
const productService = use('App/Services/ProductService');
const Logger = use('Logger');

class ImageController {

    async addUserImage({ request, response }) {

        try {
            const userHasImage = request.params.type == 'avatar' ?
                await userService.checkUserHasAvatar(request.params.id) :
                await userService.checkUserHasCover(request.params.id)

            if(userHasImage.length) {
                await uploadService.deleteImage(userHasImage[0]);
            }

            const { fileName, url } = await uploadService.uploadImage(request);
            
            const data = {
                file_name: fileName,
                avatar_user_id: request.params.type == 'avatar' ? request.params.id : null,
                cover_user_id: request.params.type == 'cover' ? request.params.id : null,
                image_url: url
            };
            
            const image = await Image.create(data);

            response.status(200).send(image);
            
        } catch (error) {
            response.status(404).send(error.message);
        }
    }

    async addStoreImage({ request, response }) {

        try {
            const storeHasImage = request.params.type == 'avatar' ?
                await storeService.checkStoreHasLogo(request.params.id) :
                await storeService.checkStoreHasCover(request.params.id)

            if(storeHasImage.length) {
                await uploadService.deleteImage(storeHasImage[0]);
            }

            const { fileName, url } = await uploadService.uploadImage(request);
            
            const data = {
                file_name: fileName,
                logo_store_id: request.params.type == 'logo' ? request.params.id : null,
                cover_store_id: request.params.type == 'cover' ? request.params.id : null,
                image_url: url
            };
            
            const image = await Image.create(data);

            response.status(200).send(image);
            
        } catch (error) {
            response.status(404).send(error.message);
        }
    }

    async addProductImages({ request, response }) {

        try {
            const storeHasImage = await productService.checkProductHasImages(request.params.id);

            const files = await uploadService.uploadProductImages(request, storeHasImage.length);

            Logger.info('FILESS!!!!', files);
            Logger.info('storeHasImage!!!!', storeHasImage);

            for(let i = 0; i < files.length; i++) {
                const data = {
                    file_name: files[i].fileName,
                    product_id: request.params.id,
                    image_url: files[i].url,
                    product_image_index: files[i].product_image_index
                };
                
                await Image.create(data);
            }
            

            response.status(200).send(files);
            
        } catch (error) {
            response.status(404).send(error.message);
        }
    }

    async deleteProductsImages({ request, response }) {

        try {
            const imagesToDeleteData = await request.only(['idsToDelete', 'product_id']);
            
            // Deletando as imagens
            const imagesToDelete = await Database
                .from('images')
                .whereIn('id', imagesToDeleteData.idsToDelete);
                
            for(let i = 0; i < imagesToDelete.length; i++) {
                await uploadService.deleteImage(imagesToDelete[i]);
            }
             
            // Organizando index das imagens não deletadas
            const imagesNotDeleted = await Database
                .from('images')
                .where('product_id', imagesToDeleteData.product_id);
    
            for(let i = 0; i < imagesNotDeleted.length; i++) {
                await Database
                    .table('images')
                    .where('id', imagesNotDeleted[i].id)
                    .update('product_image_index', i)
            }

            response.status(200).send(imagesToDelete);
            
        } catch (error) {
            response.status(404).send(error.message);
        }
    }
};

module.exports = ImageController;
