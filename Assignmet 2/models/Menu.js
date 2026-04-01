const mongoose = require('mongoose');

const Menu = mongoose.model("Menu", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imagePredefined: String,
    imageUrl: String,
    size: String,
    crust: String,
    toppings: [String]
}));