const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
	title: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
    },
    img:{
        type:String,
    }
});

module.exports = Product;
