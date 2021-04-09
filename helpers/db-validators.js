const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async ( role = '' ) => {

    const roleExist = await Role.findOne( { role } );

    if( ! roleExist ) {
        throw new Error( `Role ${ role } is not registered on DB` );
    }

};

const emailExist = async ( email = '' ) => {

    const emailExist = await User.findOne( { email } );

    if( emailExist ) {

        throw new Error( `E-mail ${ email } is already registered on DB` );

    }

};

const userIdExist = async ( id ) => {

    const idExist = await User.findById( id );

    if( ! idExist ) {

        throw new Error( `ID ${ id } is not registered on DB` );

    }

};

module.exports = {
    isValidRole,
    emailExist,
    userIdExist
};