const { Category, Product, Role, Server, User } = require('../models');

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

const categoryIdExist = async ( id ) => {

    const idCatExist = await Category.findById( id );

    if( ! idCatExist ) {

        throw new Error( `ID ${ id } is not registered on DB` );

    }

};

const categoryNameExist = async ( name ) => {

    name = name.toUpperCase();

    const catNameExist = await Category.findOne( { name } );

    if( catNameExist ) {

        throw new Error( `Name ${ name } already exist on DB` );

    }

};

const productIdExist = async ( id ) => {

    const idProdExist = await Product.findById( id );

    if( ! idProdExist ) {

        throw new Error( `ID ${ id } is not registered on DB` );

    }

};

module.exports = {
    categoryIdExist,
    categoryNameExist,
    emailExist,
    isValidRole,
    productIdExist,
    userIdExist
};