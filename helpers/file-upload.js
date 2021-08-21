const { v4: uuidv4 } = require('uuid');
const path = require('path');

const fileUpload = ( files, allowedFormats = [ 'jpg', 'jpeg', 'png', 'gif' ], folder = '' ) => {

    return new Promise(( resolve, reject ) => {

        const { file } = files;

        // Validate file format

        const splitFile = file.name.split( '.' );
        const extension = splitFile[ splitFile.length - 1 ];

        if( ! allowedFormats.includes( extension ) ) {

            return reject( `File format ${ extension } is not allowed, allowed formats: ${ allowedFormats }` );

        }   
    
        // Generate file temporal name

        const tempFileName = uuidv4() + '.' + extension;

        // Generate upload file path and upload

        const uploadPath = path.join( __dirname, '../uploads/', folder, tempFileName );
    
        // Move file to final folder

        file.mv( uploadPath, function( err ) {

            if( err ) {

                reject( err );

            }
        
            resolve( tempFileName );

        });

    });
  

};

module.exports = {
    fileUpload
};