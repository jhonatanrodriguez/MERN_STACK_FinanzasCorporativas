const EstadoDeResultados_2009Service = require('./EstadoDeResultados_2009Service');

function EstadoDeResultados(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.EstadoDeResultados(estadoDeResultados_2009, done)
}
function DeclaracionIngresos(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.DeclaracionIngresos(estadoDeResultados_2009, done)
}
function activos(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.activos(estadoDeResultados_2009, done)
}
function activosDos(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.activosDos(estadoDeResultados_2009, done)
}
function getSustracion(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.getSustracion(estadoDeResultados_2009, done)
}
function getRazonesFinancieras(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.getRazonesFinancieras(estadoDeResultados_2009, done)
}
function getROE(estadoDeResultados_2009, done){
    EstadoDeResultados_2009Service.getROE(estadoDeResultados_2009, done)
}
module.exports = {EstadoDeResultados, DeclaracionIngresos, activos, activosDos, getSustracion, getRazonesFinancieras, getROE}