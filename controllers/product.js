const { response } = require("express");
const { Product } = require('../models');

const createProduct = async (  req, res = response ) => {

    const { status, user, ...body } = req.body;

    const productInDB = await Product.findOne({ name: body.name });

    if( productInDB ) {
        return res.status(400).json({
            msg: `Product ${ productInDB.name }, already exists`
        });
    }

    // Generate data to store in DB
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    };

    const product = await new Product( data );

    // Save in DB
    await product.save();

    res.status(201).json( product );

};

const getProducts = async ( req, res = response ) => {

    const { limit = 0, offset = 0 } = req.query;
    const query = { status: true };

    const [ total, products ] = await Promise.all([

        Product.countDocuments( query ),
        Product.find( query )
        .populate( 'user', 'name' )
        .populate( 'category', 'name' )
        .skip( Number( offset ) )
        .limit( Number( limit ) )

    ]);

    res.json({
        total,
        products
    });

};

const getProductById = async ( req, res = response ) => {

    const { id } = req.params;

    const product = await Product.findById( id )
                                    .populate( 'user', 'name' )
                                    .populate( 'category', 'name' );
    
    res.json({
        product
    });

};

const updateProduct = async ( req, res = response ) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if( data.name ) {
        data.name = data.name.toUpperCase();
    }
    
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new: true } );

    res.json( product );

};

const deleteProduct = async ( req, res = response ) => {

    const { id } = req.params;
    
    // Change product status
    const product = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );

    res.json( product );

};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};