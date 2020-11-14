const Drive = use('Drive');
const Image = use('App/Models/Image');
const Logger = use('Logger');

class UploadService {
    async uploadImage(request) {
        let url = '';
        let fileName = '';
        const folder = 'uploads';
            
        request.multipart.file('picture', {}, async file => {
            fileName = `${Date.now()}-${file.clientName.split(' ').join('-')}`;
            
            await Drive.put(`${folder}/${fileName}`, file.stream, {
                ACL: 'public-read',
                ContentType: `${file.type}/${file.subtype}`,
            });
            
            url = `https://handshake-img-store.s3.amazonaws.com/uploads/${fileName}`;
        });
        
        await request.multipart.process();

        return {
            fileName,
            url
        };
    }

    async uploadProductImages(request) {
        const folder = 'uploads';
        let i = 0;
        let files = [];
            
        request.multipart.file('picture', {}, async file => {
            let fileName = `${Date.now()}-${file.clientName.split(' ').join('-')}`;
            
            await Drive.put(`${folder}/${fileName}`, file.stream, {
                ACL: 'public-read',
                ContentType: `${file.type}/${file.subtype}`,
            });
            
            let url = `https://handshake-img-store.s3.amazonaws.com/uploads/${fileName}`;

            const newFile = {
                product_image_index: i,
                fileName,
                url
            };

            files[i] = newFile;

            i++
        });
        
        await request.multipart.process();

        return files;
    }

    async deleteImage(image) {
        Logger.info('Deletando imagem:', image);

        try {
            await Drive.delete(`uploads/${image.file_name}`);
            
            const imageToDelete = await Image.find(image.id);
            
            await imageToDelete.delete();
    
            return { message: "image successfully deleted." };
        } catch (error) {
            Logger.error('ERRO!!!', error.stack);
            return { message: `Erro on try to delete image: ${error.stack}` };
        }
        
    }
  }
  
  module.exports = new UploadService();