const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateUploadedFile } = require('../middlewares');
const { uploadFile, updateImageCloudinary, showImage } = require('../controllers/upload');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post( '/', validateUploadedFile, uploadFile );

router.put( '/:collection/:id', [
    validateUploadedFile,
    check( 'id', 'Must be a Mongo ID' ).isMongoId(),
    check( 'collection' ).custom( c => allowedCollections( c, [ 'products', 'users' ] ) ),
    validateFields
], updateImageCloudinary );

router.get( '/:collection/:id', [
    check( 'id', 'Must be a Mongo ID' ).isMongoId(),
    check( 'collection' ).custom( c => allowedCollections( c, [ 'products', 'users' ] ) ),
    validateFields
], showImage );

module.exports = router;