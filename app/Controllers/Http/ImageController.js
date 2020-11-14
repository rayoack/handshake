'use strict'

const Image = use('App/Models/Image');
const uploadService = use('App/Services/UploadService');
const userService = use('App/Services/UserService');
const storeService = use('App/Services/StoreService');
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

};

module.exports = ImageController;
