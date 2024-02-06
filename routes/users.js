const express = require('express');
const Router = express.Router()
const User = require('../models/User');
const notifier = require('node-notifier');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;

Router.get('/table-users', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);


        res.render('basic-user-management', { data: users, data1: users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/edit-user', async (req, res) => {
    try {
        const { mail, card_title, card_text, text_muted } = req.body;
        const user = await User.findOne({ email: mail });
        console.log(user);
        // Create a new product document
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Verify the current password
        const isPasswordMatch = await bcrypt.compare(card_text, user.password);

        if (!isPasswordMatch) {
            return res.status(401).send('Incorrect current password');
        }

        // Hash the new password before updating
        const hashedNewPassword = await bcrypt.hash(text_muted, 10);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();


        return res.render('basic-user-management', {
            title: 'Succes',
            success: 'User edited!',

        }); // Redirect to the products table or any other route
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/delete-user', async (req, res) => {
    try {
        const { mail } = req.body;
        const user = await User.findOne({ email: mail });
        console.log(user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        User.deleteOne({ email: mail });
        return res.render('basic-user-management', {
            title: 'Succes',
            success: 'User deleted!',

        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

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