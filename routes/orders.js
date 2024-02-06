const express = require('express');
const session = require('express-session');

const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/table-clients', async (req, res) => {
    try {
        const users = await User.find();
        const orders = await Order.find();

        console.log(users);
        console.log(orders);

        res.render('basic-table', { data: users, data1: orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/buy', async (req, res) => {
    try {
        const data = req.session.store;
        console.log(data)
        if (!data) {
            console.log("You need to login");
            return res.render('login', {
                title: 'Error',
                success: 'Can`t complete.You need to login!',

            });
        }
        const first_name = data.first_name;

        // Assuming you have a User model for user details
        const user = await User.findOne({ first_name });

        if (!user) {
            console.log("User not found");
            return res.status(404).send('User not found');
        }

        const { email, last_name } = user;

        // Create a new order document
        const newOrder = new Order({
            first_name,
            last_name,
            email,
        });

        // Save the order document to the MongoDB collection
        const savedOrder = await newOrder.save();

        // Render success message
        res.render('index', {
            title: 'Succes',
            success: 'An operator will contact you as soon as possible via email.',
            first_name: first_name,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
