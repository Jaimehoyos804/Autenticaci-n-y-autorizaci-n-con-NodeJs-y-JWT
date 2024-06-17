const { Router } = require('express')
const marca = require('../models/Marca');
const router = Router();
const { validationResult, check } = require('express-validator');
const Marca = require('../models/Marca');
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

router.get('/',[validarJWT, validarRolAdmin], async function (req, res) {
    try {

        const marca = await Marca.find();
        res.send(marca);

    } catch (error) {
        console.log(error)
    }

});

// POST method route
router.post('/',[validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array })
        }

        

        let marcas = new Marca();
        marcas.nombre = req.body.nombre;
        marcas.estado = req.body.estado;
        marcas.fechaCreacion = new Date();
        marcas.fechaActualizacion = new Date();
        marcas = await marcas.save()
        res.status(200).send(marcas);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error al crear la marca')
    }


});

module.exports = router;