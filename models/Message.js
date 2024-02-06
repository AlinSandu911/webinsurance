const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, required: true },
    message: String
});

const Message = mongoose.model('Message', userSchema);

module.exports = Message;