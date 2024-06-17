const { Router } = require('express')
const Usuarios = require('../models/Usuario');
const router = Router();
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

// POST method route
router.post('/', [
   
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
    

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array })
        }

        const Usuarios = await Usuario.findOne({ email: req.body.email });
        if (!Usuarios) {
            return res.status(400).json({mensaje: 'user not found' });
        }

        const esIgual = bcryptjs.compareSync(req.body.password, Usuarios.password)
        if(!esIgual){
            return res.status(400).json({mensaje: "User not found"})
        }
         
        //Generando token
        const token = generarJWT(Usuarios);

        res.json({
            _id: Usuarios._id, nombre: Usuarios.nombre,
            rol: Usuarios.rol, email: Usuarios.email,
            acces_token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server error')
    }


});

module.exports = router;