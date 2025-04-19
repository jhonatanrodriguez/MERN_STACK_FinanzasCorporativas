const mongoose = require('mongoose');
const express = require('express');
const url = "mongodb://127.0.0.1/RazonesFinancierasDb";
mongoose.connect(url,{useNewUrlParser:true});
const connection = mongoose.connection;
const app = express();
app.use(express.json());
connection.on('open', ()=>{
    console.log('conected...')
});

