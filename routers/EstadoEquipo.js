const { Router } = require('express');
const router = Router();
const { validationResult, check } = require('express-validator');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener los tipos de equipo');
    }
});

// POST method route
router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let estadoEquipos = new EstadoEquipo(); 
        estadoEquipos.nombre = req.body.nombre;
        estadoEquipos.estado = req.body.estado;
        estadoEquipos.fechaCreacion = new Date();
        estadoEquipos.fechaActualizacion = new Date();
        estadoEquipos = await estadoEquipos.save();
        res.status(200).send(estadoEquipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el tipo de equipo');
    }
});

module.exports = router;
