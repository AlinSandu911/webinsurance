const express = require('express');
const Router = express.Router();
const Message = require('../models/Message');

Router.post('/contact', async (req, res) => {
    try {
        console.log('Message from contact!');
        const { first_name, last_name, email, message } = req.body;

        // Create a new message document
        const newMessage = new Message({
            first_name,
            last_name,
            email,
            message,
        });

        const savedMessage = await newMessage.save();

        console.log(message);
        res.redirect('/contact');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = Router;