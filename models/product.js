const { Schema, model } = require('mongoose');

const productSchema = Schema({

    name: {
        type: String,
        required: [ true, 'Product name is required' ]
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
    },
    price: {
        type: Number,
        dafault: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { 
        type: String 
    },
    in_stock: { 
        type: Boolean, 
        default: true 
    },
    img: {
        type: String

    }

});

// Remove params from inserted category

productSchema.methods.toJSON = function() {

    const { __v, status, ...data } = this.toObject();
    return data;

};

module.exports = model( 'Product', productSchema );