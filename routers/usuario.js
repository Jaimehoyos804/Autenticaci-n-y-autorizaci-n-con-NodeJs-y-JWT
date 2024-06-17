const { Router } = require('express')
const Usuarios = require('../models/Usuario');
const router = Router();
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs')
const {validarJWT} = require('../middleware/validar-jwt')
const {validarRolAdmin} = require('../middleware/validar-rol-admin')

router.get('/',[validarJWT,  validarRolAdmin], async function (req, res) {
    try {

        const usuarios = await Usuarios.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error)
    }

});

// POST method route
router.post('/',[validarJWT, validarRolAdmin], [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'ivalid.rol').isIn(['Administrador', 'Docente'])

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array })
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('El Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync(req.body.password, salt);
        usuario.password = password;
        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save()
        res.status(200).send(usuario);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error al crear el usuario')
    }


});

module.exports = router;