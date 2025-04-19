const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const EstadoDeResultados_2009Router = require('./EstadoDeResultados_2009Router');
app.use(express.json());
app.use(cors()); 
app.use(EstadoDeResultados_2009Router);
app.listen(3000, ()=>{
    console.log('listenin in port 3000!!!');
} )