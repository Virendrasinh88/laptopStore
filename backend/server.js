// const express = require("express");
// const cors = require('cors');
// const app = express();
// const http = require('http');
// require('./connection') 
// const server = http.createServer(app);
// const {Server} = require('socket.io');
// const io = new Server(server,{
//     cors: '*',
//     methods: '*'
// })


// // const User = require('./models/User');
// const User= require('./models/User');
// const userRoutes = require('./routes/userRoutes');


// app.use(cors());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json);
// app.use('/users',userRoutes)

// app.get('/', async(req, res)=> {
// //     const {name, email, password} = req.body;
// //   // console.log(name, email,password);
// //     try {
// //       const user = await User.create({name, email, password});
// //       res.json(user);
// //     } catch (e) {
// //       if(e.code === 11000) return res.status(400).send('Email already exists');
// //       res.status(400).send(e.message)
// //     }
// //     // console.log("Done");
//     res.send("user");
//   })



// server.listen(8080, ()=> {
//     console.log('server running at port 8080')
// })


const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
require('./connection')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})


const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const imageRoutes = require('./routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);
// app.use('/images', imageRoutes);


app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})


server.listen(3001, ()=> {
  console.log('server running at port', 3001)
})

app.set('socketio', io);

console.log("Hello");