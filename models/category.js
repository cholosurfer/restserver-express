const { Schema, model } = require('mongoose');

const categorySchema = Schema({

    name: {
        type: String,
        required: [ true, 'Category name is required' ]
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

// Remove params from inserted category

categorySchema.methods.toJSON = function() {

    const { __v, status, ...data } = this.toObject();
    return data;

};

module.exports = model( 'Category', categorySchema );