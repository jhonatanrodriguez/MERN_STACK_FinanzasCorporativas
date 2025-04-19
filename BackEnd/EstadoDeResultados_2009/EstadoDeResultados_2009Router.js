const express = require('express');
const EstadoDeResultados_2009 = require('./EstadoDeResultados_2009Model');
const EstadoDeResultados_2009Controller = require('./EstadoDeResultados_2009Controller');
const router = express.Router();
router.get('/', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.EstadoDeResultados(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/ing', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.DeclaracionIngresos(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/activos', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.activos(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/activosdos', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.activosDos(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/getsus', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.getSustracion(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/getraz', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.getRazonesFinancieras(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/getroe', async(req, res)=>{
    try {
        EstadoDeResultados_2009Controller.getROE(EstadoDeResultados_2009, (err, result)=>{
            if (err) {
                res.status(400).send('err')
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
});
module.exports = router;