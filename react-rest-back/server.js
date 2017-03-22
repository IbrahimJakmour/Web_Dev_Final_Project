const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const PORT = 8080
const mongoose = require('mongoose');
const User = require('./models/users');
const Event = require('./models/events');
const authorize = require('./authentication/middleware/authorize');
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/data/db');
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => (
    console.log('connected to db at /data/db')
));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/privatedata', authorize, (req, res) => {
    res.json(req.decoded.username)
    console.log(req.decoded)
} )

//mount routes
const eventRoutes = require('./routes/event_routes'),
      userRoutes = require('./routes/user_routes');
      loginRoutes = require('./routes/login_routes');
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

// app.get('*', (req,res) =>{
//     console.log('catch all route')
// })

app.listen(PORT, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});

