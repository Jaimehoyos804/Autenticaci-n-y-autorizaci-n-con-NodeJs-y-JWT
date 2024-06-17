const jwt = require('jsonwebtoken');

const validarRolAdmin = (req, res, next) => {
   
    if (req.payload.rol !== 'Administrador') {
        return res.status(401).json({ mensaje: "Error de autorización: no tienes permisos de administrador" });
    }
    next(); 
}

module.exports = {
    validarRolAdmin
}
