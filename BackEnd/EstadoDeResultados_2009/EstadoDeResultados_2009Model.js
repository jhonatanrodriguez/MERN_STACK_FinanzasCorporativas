const mongoose = require('mongoose');
const estadoSchema = mongoose.Schema({
    ventas: {
        type: Number,
        require: true
    },
    costoDeVentas: {
        type: Number,
        require: true
    },
    depreciacion: {
        type: Number,
        require: true
    },
    interesesPagados: {
        type: Number,
        require: true
    },
    impuestos: {
        type: Number,
        require: true
    },
    dividendos: {
        type: Number,
        require: true
    },
    adicionUtilidadesRetenidas: {
        type: Number,
        require: true
    }
});
const EstadoDeResultados_2009 = mongoose.model('estadoDeResultados_2009', estadoSchema);
module.exports = EstadoDeResultados_2009