const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session');
const router = express.Router();
const path = require('path');
const alert = require('alert')
const bodyParser = require('body-parser')
const notifier = require('node-notifier');

const app = express();
app.use(session({
  secret: 'gtfhyrdfgcvhjb',
  resave: true,
  saveUninitialized: true
}));
const Product = require('./models/Product');

//Routes
const UsersRoutes = require('./routes/users');
const OrdersRoutes = require('./routes/orders');
const MessagesRoutes = require('./routes/messages');
const ProductsRoutes = require('./routes/products');
const NewslettersRoutes = require('./routes/newsletters');

const { rootCertificates } = require('tls');

//////////////////////////////////////// DB ////////////////////////////////////////////////
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admindb:yNAZZGzKj813MyDJ@db.ybicneu.mongodb.net/?retryWrites=true&w=majority";

//////////////////////// Create a new MongoClient//////////////////////
const client = new MongoClient(uri, {
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

mongoose.connect("mongodb+srv://admindb:yNAZZGzKj813MyDJ@db.ybicneu.mongodb.net/?retryWrites=true&w=majority")
//////////////////////////////////////////////////////////////////

// parse application/json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/assets', express.static(__dirname + 'public/assets'))
app.use('/assets-dashboard', express.static(__dirname + 'public/assets-dashboard'))
app.use('/scripts', express.static(__dirname + 'public/scripts'))


// Set Views
app.set('front-end', path.join(__dirname, 'front-end'))
app.set('view engine', "ejs")

let data = {
  first_name: undefined,
}

let data1 = {
  first_name: undefined,
}


// Routes
app.use("/users", UsersRoutes)
app.use("/orders", OrdersRoutes)
app.use("/products", ProductsRoutes)
app.use("/messages", MessagesRoutes)
app.use("/newsletters", NewslettersRoutes)

app.use(UsersRoutes)
app.use(NewslettersRoutes)
app.use(OrdersRoutes)
app.use(MessagesRoutes)
app.use(ProductsRoutes)

app.get('/', (req, res) => {
  res.render('index', { first_name: data.first_name, success: '' })
})

app.get('/', (req, res) => {
  res.render('index', { first_name: data.first_name })
})

app.get('/about', (req, res) => {
  res.render('about', { first_name: data.first_name })
})

app.get('/products', async (req, res) => {
  const products = await Product.find();
  const productsArray = Array.isArray(products) ? products : [products];
  console.log(products)
  res.render('products', { first_name: data.first_name, products: productsArray })
})

app.get('/login', (req, res) => {
  res.render('login', { success: '' })
})

app.get('/login', (req, res) => {
  res.render('login', { title: '', success: '' })
})


app.get('/logout', (req, res) => {
  data = { first_name: undefined }
  data1 = { first_name: undefined }
  res.redirect('/')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/contact', (req, res) => {
  res.render('contact', { first_name: data.first_name })
})

app.get('/table-clients', function (req, res) {
  connection.query('SELECT * FROM users', function (err1, result1) {

    if (err1) {
      throw err1;
    } else {
      connection.query('SELECT * FROM orders', function (err2, result2) {

        if (err2) {
          throw err2;
        } else {
          res.render('basic-table', { data: result1, data1: result2 });
          return;
        }
      });

    }
  });

});

const User = require('./models/User');
const bcrypt = require('bcrypt');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('User not found or incorrect password');
      req.session.store = []
      return res.redirect('/login');
    }

    console.log(`Welcome ${user.first_name}`);

    if (user.first_name === 'Admin') {
      return res.redirect('/dashboard');
    } else {
      req.session.store = user;
      console.log(req.session)
      data = {
        first_name: user.first_name
      }
      data1 = {
        first_name: user.first_name
      }
      notifier.notify({
        title: 'Good news!',
        message: 'You have connected successfully!',
        icon: path.join(__dirname, 'icon.jpg'),
        sound: true,
        wait: true,
      }, function (err, response) {
        console.log(response);
      });

      return res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

const port = 5000

app.listen(port, console.log(`listening on port ${port}`));
module.exports = { app };
