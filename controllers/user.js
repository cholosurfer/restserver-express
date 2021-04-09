const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async ( req = request, res = response ) => {

    const { limit = 5, offset = 0 } = req.query;

    // More than one await will slow down performance

    //const users = await User.find()
    //    .skip( Number( offset ) )
    //    .limit( Number( limit ) );

    //const total = await User.countDocuments();

    // Increase performance with promises

    const [ total, users ] = await Promise.all([

        User.countDocuments(),
        User.find()
        .skip( Number( offset ) )
        .limit( Number( limit ) )

    ]);

    res.json({
        total,
        users
    });

};

const postUser = async ( req, res = response ) => {

    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    // Encrypt password

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save in DB

    await user.save();

    res.json({
        user
    });

};

const putUser = async ( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google_auth, email, ...rest } = req.body;

    // TODO validate with DB

    if( password ) {

        // Encrypt password

        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );

    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json( user );

};

const deleteUser = async ( req, res = response ) => {

    const { id } = req.params;

    // Delete user from DB
    //const user = await User.findByIdAndDelete( id );

    // Change user status
    const user = await User.findByIdAndUpdate( id, { status = false } );

    res.json( user );

};

const patchUser = ( req, res = response ) => {

    res.json({
        msg: 'Patch user - controller'
    });

};

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
};