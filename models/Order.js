const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, required: true },
});

const Order = mongoose.model('Order', userSchema);

module.exports = Order;