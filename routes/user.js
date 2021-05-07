const { Router } = require('express');
const { check } = require('express-validator');

const { getUser, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');
const { isValidRole, emailExist, userIdExist } = require('../helpers/db-validators');

const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', getUser );

router.post('/', [
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'password', 'Password has to be more than 6 characters' ).isLength( { min:6 } ),
    check( 'email', 'E-mail is not valid' ).isEmail(),
    check( 'email' ).custom( emailExist ),
    //check( 'role', 'Role is not valid' ).isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
    check( 'role' ).custom( isValidRole ),
    validateFields
], postUser );

router.put('/:id', [
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( userIdExist ),
    check( 'role' ).custom( isValidRole ),
    validateFields
], putUser );

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole( 'ADMIN_ROLE', 'SELL_ROLE' ),
    check( 'id', 'Not a valid ID' ).isMongoId(),
    check( 'id' ).custom( userIdExist ),
    validateFields 
], deleteUser );

router.patch('/', patchUser );

module.exports = router;