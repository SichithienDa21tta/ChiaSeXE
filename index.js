// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5500;

//config template engine
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

//config static files
app.use(express.static(path.join(__dirname,'public')));

app.get("/api",(req,res)=>{
    res.status(200).json("Hello");
})

app.get("/",(req,res)=>{
  res.render('index.ejs');
})

//kết nối MongoDB Atlas
const uri = 'mongodb+srv://sichithien2017:Chithien2020@cluster0.gv3xuhn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));

db.once('open', () => {
  console.log('Kết nối thành công đến MongoDB!');
});

app.use(bodyParser.json());
app.use('/', routes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
