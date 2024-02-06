const express = require('express');
const Router = express.Router();
const Newsletter = require('../models/Newsletter');

Router.post('/newsletter', async (req, res) => {
    try {
        console.log("Successfully newsletter registration!");

        const { first_name, email } = req.body;

        // Check if the email already exists in the database
        const existingSubscription = await Newsletter.findOne({ email });

        if (existingSubscription) {
            return res.render('index', {
                title: 'User Records',
                success: 'You are already subscribed to the newsletter!',
                first_name: first_name,
            });
        }
        // Create a new newsletter document
        const newSubscription = new Newsletter({
            first_name,
            email,
        });

        // Save the newsletter document to the MongoDB collection
        const savedSubscription = await newSubscription.save();

        console.log(first_name);

        res.render('index', {
            title: 'User Records',
            success: 'You have successfully subscribed to the newsletter!',
            first_name: first_name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = Router;