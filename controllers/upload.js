const path = require('path');
const fs = require('fs'); // filesystem

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require("express");
const { fileUpload } = require('../helpers');

const { User, Product } = require('../models');

const uploadFile = async ( req, res = response ) => {
  
    // Images to upload

    try {

        const uploadedFile = await fileUpload( req.files, undefined, 'img' );

        res.json({ uploadedFile });
        
    } catch (error) {

        res.status(400).json({ error });
        
    }

    

};

const updateImage = async ( req, res = response ) => {

    const { collection, id } = req.params;

    let model;

    switch( collection ) {

        case 'users':
            model = await User.findById( id );

            if( ! model ) {

                return res.status(400).json({
                    msg: `User id ${ id } doesn't exist`
                });

            }

            break;

        case 'products':
            model = await Product.findById( id );

            if( ! model ) {

                return res.status(400).json({
                    msg: `Product id ${ id } doesn't exist`
                });

            }

            break;

        default:
            return res.status(500).json({ msg: 'forgot this' });

    }

    // Check and remove old image

    if( model.img ) {

        // Remove image from server

        const imagePath = path.join( __dirname, '../uploads', collection, model.img );

        if( fs.existsSync( imagePath ) ) {

            fs.unlinkSync( imagePath );

        }

    }

    // Save image 

    const fileName = await fileUpload( req.files, undefined, collection );
    model.img = fileName;

    await model.save();

    res.json({ model });

};

const updateImageCloudinary = async ( req, res = response ) => {

    const { collection, id } = req.params;
    let model;

    switch( collection ) {

        case 'users':
            model = await User.findById( id );

            if( ! model ) {

                return res.status(400).json({
                    msg: `User id ${ id } doesn't exist`
                });

            }

            break;

        case 'products':
            model = await Product.findById( id );

            if( ! model ) {

                return res.status(400).json({
                    msg: `Product id ${ id } doesn't exist`
                });

            }

            break;

        default:
            return res.status(500).json({ msg: 'forgot this' });

    }

    // Check and remove old image

    if( model.img ) {

        // Remove image from server

       const url = model.img.split( '/' );
       const name = url[ url.length - 1 ];
       const [ public_id ] = name.split( '.' );
       
       cloudinary.uploader.destroy( public_id ); 

    }

    // Upload image

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;

    await model.save();

    res.json( model );

};

const showImage = async ( req, res = response ) => {

    const { collection, id } = req.params;

    switch( collection ) {

        case 'users':
            model = await User.findById( id );

            if( ! model ) {

                return res.status(400).json({
                    msg: `User id ${ id } doesn't exist`
                });

            }

            break;

        case 'products':
            model = await Product.findById( id );

            if( ! model ) {

                return res.status(400).json({
                    msg: `Product id ${ id } doesn't exist`
                });

            }

            break;

        default:
            return res.status(500).json({ msg: 'forgot this' });

    }

    // Check if image exist

    if( model.img ) {

        // Get image path from server

        const imagePath = path.join( __dirname, '../uploads', collection, model.img );

        if( fs.existsSync( imagePath ) ) {

            return res.sendFile( imagePath );

        }

    }

    // Get no image path from server

    const noImagePath = path.join( __dirname, '../assets/no-image.jpg' );

    res.sendFile( noImagePath );

};

module.exports = {
    uploadFile,
    updateImage,
    updateImageCloudinary,
    showImage
};