const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: {
        type: Object
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema, 'product');