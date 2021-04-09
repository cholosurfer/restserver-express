const { Schema, model } = require('mongoose');

const userSchema = Schema({

    name: {
        type: String,
        required: [ true, 'Name is required.' ]
    },
    email: {
        type: String,
        required: [ true, 'E-mail is required.' ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required.' ]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    google_auth: {
        type: Boolean,
        default: false
    }

});

// Remove params from inserted user

userSchema.methods.toJSON = function() {

    const { __v, password, ...user } = this.toObject();
    return user;

};

module.exports = model( 'User', userSchema );