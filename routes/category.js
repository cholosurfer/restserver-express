const { Router } = require('express');
const { check } = require('express-validator');

const { createCategory, 
        getCategories, 
        getCategoryById, 
        updateCategory, 
        deleteCategory } = require('../controllers/category');
const { categoryIdExist, categoryNameExist } = require('../helpers/db-validators');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

// Get all categories - Public

router.get( '/all', getCategories );

// Get category by id - Public

router.get( '/:id', [
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( categoryIdExist ),
    validateFields,
], getCategoryById );

// Create category - Private - Anyone with valid token

router.post( '/', [ 
    validateJWT,
    check( 'name', 'Category name is required' ).not().isEmpty(),
    validateFields
], createCategory );

// Update category - Private - Anyone with valid token

router.put( '/:id' , [
    validateJWT,
    check( 'name', 'Category name is required' ).not().isEmpty(),
    check( 'name' ).custom( categoryNameExist ),
    validateFields,
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( categoryIdExist ),
    validateFields
], updateCategory );

// Remove category - Admin
router.delete( '/:id', [
    validateJWT,
    isAdminRole,
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( categoryIdExist ),
    validateFields
], deleteCategory );

module.exports = router;