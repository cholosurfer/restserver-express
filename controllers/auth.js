const { response } = require('express-validator');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verify if e-mail exist

        const user = await User.findOne({ email });

        if( !user ) {

            return res.status(400).json({
                msg: 'User or password not valid - e-mail'
            });

        }

        // Check if user is active

        if( !user.status ) {

            return res.status(400).json({
                msg: 'User or password not valid - status: false'
            });

        }

        // Verify password

        const isValidPassword = bcryptjs.compareSync( password, user.password );

        if( !isValidPassword ) {

            return res.status(400).json({
                msg: 'User or password not valid - password'
            });

        }

        // Generate JWT(JSON Web Token)

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });


    } catch (error) {
        
        console.log( error );

        return res.status(500).json({
            msg: 'Something went wrong',
        });

    }

};

module.exports = {
    login
};