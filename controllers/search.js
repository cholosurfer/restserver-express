const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Category, Product, User } = require('../models');

const allowedCollections = [

    'categories',
    'products',
    'roles',
    'users'

];

const searchCategories = async ( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term ); // Return true

    if( isMongoId ) {

        const category = await Category.findById( term );
        
        return res.json({
            results: ( category ) ? [ category ] : []
        });

    }

    const regex = new RegExp( term, 'i' ); // Case insentive

    const categories = await Category.find( { name: regex }, { status: true } );

    res.json({
        results: categories
    });

};

const searchProducts = async ( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term ); // Return true

    if( isMongoId ) {

        const product = await Product.findById( term )
                                        .populate( 'category', 'name' );
        
        return res.json({
            results: ( product ) ? [ product ] : []
        });

    }

    const regex = new RegExp( term, 'i' ); // Case insentive

    const products = await Product.find( { name: regex }, { status: true } )
                                    .populate( 'category', 'name' );

    res.json({
        results: products
    });

};

const searchUsers = async ( term = '', res = response ) => {

    const isMongoId = ObjectId.isValid( term ); // Return true

    if( isMongoId ) {

        const user = await User.findById( term );
        
        return res.json({
            results: ( user ) ? [ user ] : []
        });

    }

    const regex = new RegExp( term, 'i' ); // Case insentive

    const users = await User.find({ 
        $or: [{ name: regex }, {email: regex}], // Mongo OR condition
        $and: [{ status: true }] // Mongo AND condition
    });

    res.json({
        results: users
    });

};

const search = ( req, res = response) => {

    const { collection, term } = req.params;

    if( ! allowedCollections.includes( collection ) ) {

        return res.status(400).json({
            msg: `Invalid collection, the allowed collections are: ${allowedCollections}`
        });

    }

    switch( collection ) {

        case 'categories':
            searchCategories( term, res );
            break;
        
        case 'products':
            searchProducts( term, res );
            break;

        case 'users':
            searchUsers( term, res );
            break;

        default: 

            res.status(500).json({
                msg: 'Forgotten search'
            });

    }

};

module.exports = {
    search
};