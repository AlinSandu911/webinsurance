const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    email: { type: String, unique: true, required: true },
});

const Newsletter = mongoose.model('Newsletter', userSchema);

module.exports = Newsletter;