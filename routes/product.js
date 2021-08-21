const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct, 
        getProducts, 
        getProductById, 
        updateProduct, 
        deleteProduct } = require('../controllers/product');
const { categoryIdExist, productIdExist } = require('../helpers/db-validators');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

// Get all products - Public

router.get( '/all', getProducts );

// Get product by id - Public

router.get( '/:id', [
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( productIdExist ),
    validateFields,
], getProductById );

// Create product - Private - Anyone with valid token

router.post( '/', [ 
    validateJWT,
    check( 'name', 'Product name is required' ).not().isEmpty(),
    check( 'price', 'Product price is required' ).not().isEmpty(),
    check( 'category', 'Product category ID is not valid' ).isMongoId(),
    check( 'description', 'Product description is required' ).not().isEmpty(),
    validateFields
], createProduct );

// Update product - Private - Anyone with valid token

router.put( '/:id' , [
    validateJWT,
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( productIdExist ),
    validateFields
], updateProduct );

// Remove product - Admin

router.delete( '/:id', [
    validateJWT,
    isAdminRole,
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( productIdExist ),
    validateFields
], deleteProduct );

module.exports = router;