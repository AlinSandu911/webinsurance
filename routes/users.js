const express = require('express');
const Router = express.Router()
const User = require('../models/User');
const notifier = require('node-notifier');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;


Router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user document
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        // Save the user document to the MongoDB collection
        const savedUser = await newUser.save();

        res.render('login', {
            title: 'User Records',
            success: 'Registered successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = Router;