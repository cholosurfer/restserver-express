const { response } = require("express");
const { Category } = require('../models');

const createCategory = async (  req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryInDB = await Category.findOne({ name });

    if( categoryInDB ) {
        return res.status(400).json({
            msg: `Category ${ categoryInDB.name }, already exists`
        });
    }

    // Generate data to store in DB
    const data = {
        name,
        user: req.user._id
    };

    const category = await new Category( data );

    // Save in DB
    await category.save();

    res.status(201).json(category);

};

const getCategories = async ( req, res = response ) => {

    const { limit = 0, offset = 0 } = req.query;
    const query = { status: true };

    const [ total, categories ] = await Promise.all([

        Category.countDocuments( query ),
        Category.find( query )
        .populate( 'user', 'name' )
        .skip( Number( offset ) )
        .limit( Number( limit ) )

    ]);

    res.json({
        total,
        categories
    });

};

const getCategoryById = async ( req, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById( id ).populate( 'user', 'name' );
    
    res.json({
        category
    });

};

const updateCategory = async ( req, res = response ) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true } );

    res.json( category );

};

const deleteCategory = async ( req, res = response ) => {

    const { id } = req.params;
    
    // Change category status
    const category = await Category.findByIdAndUpdate( id, { status: false }, { new: true } );

    res.json( category );

};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};