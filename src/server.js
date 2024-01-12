//server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
//const authRoute = require('./server/routes/auth');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} );
const PORT = process.env.PORT || 3001;
// Cấu hình express-session
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
// log requests
app.use(morgan('tiny'));
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true}));
app.use(bodyparser.json());

// mongodb connection
connectDB();

// set view engine
app.set("view engine", "ejs");

// assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// routers
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=> { console.log(`Server đang chạy tại http://localhost:${PORT}`)});