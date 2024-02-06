const express = require('express');
const Router = express.Router();
const Product = require('../models/Product');
Router.use(express.json())
Router.use(express.urlencoded({ extended: false }))


Router.get('/table-products', async (req, res) => {
    try {
        const products = await Product.find();


        res.render('basic-management', { data: products, data1: products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/add-product', async (req, res) => {
    try {
        const { url, card_title, card_text, text_muted } = req.body;

        // Create a new product document
        const newProduct = new Product({
            card_title,
            card_text,
            text_muted,
            url
        });

        // Save the product document to the MongoDB collection
        const savedProduct = await newProduct.save();

        return res.render('basic-management', {
            title: 'Succes',
            success: 'Product registered!',

        }); // Redirect to the products table or any other route
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

Router.get('/products-list', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        const data = req.session.store
        // Render the page with the products data
        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = Router;


