const express = require('express');
const router = express.Router();

var Chart = require('chart.js');
const pool = require('../database');

module.exports = router;

// *******************Rutas Para Muestras de Datos****************

router.get('/monitoreo_principal', async (req, res) => {
    res.render('monitoreo/principal');
});

router.get('/grafica', async (req, res) => {
    res.render('monitoreo/grafica');
});

router.get('/datos', async (req, res) => {
    console.log("entre")
    const minandmax = await pool.query('SELECT * FROM cliente_modulo');
    console.log(minandmax);
    res.render('monitoreo/datos', {minandmax});
});


router.post('/datos', async (req, res) => {
    console.log("entre");
    const { minimo, maximo } = req.body;
    console.log(req.body);
    const newDatos = {
        modulo_id: 1,
        cliente_id: 1,
        minimo,
        maximo
    };
    await pool.query('UPDATE cliente_modulo set ?', [newDatos]);
    res.redirect('datos');
});
