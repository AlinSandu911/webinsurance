const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    url: String,
    card_title: { type: String, unique: true, required: true },
    card_text: String,
    text_muted: String
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product;