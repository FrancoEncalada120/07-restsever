const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response) => {

    try {
        const { correo, constrasena } = req.body;

        const usuario = await Usuario.findOne({ correo: correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Login incorrecto - correo'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Login incorrecto - estado'
            });
        }


        const compararConstrasena = bcryptjs.compareSync(constrasena, usuario.constrasena);
        if (!compararConstrasena) {
            return res.status(400).json({
                msg: 'Login incorrecto - compararConstrasena'
            });
        }


        const token = await generarJWT(usuario.id);


        res.json({
            msg: 'Login',
            usuario,
            token
        });

    } catch (error) {

    }



}


const googleSingIN = async (req, res = response) => {

    const { id_token } = req.body;


    try {

        const { nombre, imagen, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            const data = {
                nombre,
                correo,
                constrasena: ':P',
                google: true,
                rol: 'ADMIN_ROLE'
            }

            usuario = new Usuario(data);
            await usuario.save();
        }



        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario con estado false'
            });
        }


        const token = await generarJWT(usuario.id);

        return res.json({
            msg: 'Login google',
            usuario,
            token
        });


    } catch (error) {
        console.log('error googleVerify', error);
        return res.status(400).json({
            id_token: id_token,
            msg: 'Token no se pudo verificar'
        });

    }


}

module.exports = { login, googleSingIN }