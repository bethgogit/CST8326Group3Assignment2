const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: String,
    size: String,
    crust: String,
    toppings: [String]
});

module.exports = mongoose.model("Menu", menuSchema);