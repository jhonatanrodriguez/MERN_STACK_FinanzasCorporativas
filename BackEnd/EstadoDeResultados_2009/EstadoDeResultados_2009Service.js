const EstadoDeResultados_2009DAO = require('./EstadoDeResultados_2009DAO');

function EstadoDeResultados(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.EstadoDeResultados(estadoDeResultados_2009, done)
}
function DeclaracionIngresos(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.DeclaracionIngresos(estadoDeResultados_2009, done)
}
function activos(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.activos(estadoDeResultados_2009, done)
}
function activosDos(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.activosDos(estadoDeResultados_2009, done)
}
function getSustracion(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.getSustracion(estadoDeResultados_2009, done)
}
function getRazonesFinancieras(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.getRazonesFinancieras(estadoDeResultados_2009, done)
}
function getROE(estadoDeResultados_2009, done){
    EstadoDeResultados_2009DAO.getROE(estadoDeResultados_2009, done)
}
module.exports = {EstadoDeResultados, DeclaracionIngresos, activos, activosDos, getSustracion, getRazonesFinancieras, getROE}