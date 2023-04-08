
const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarjwt = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }

    console.log('token', token);

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log('uid', uid);


        req.usuarioAuth = await Usuario.findById(uid);


        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no valido"
        });
    }



}

module.exports = { validarjwt }