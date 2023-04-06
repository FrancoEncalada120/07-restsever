const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuarioGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, listado] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }).limit(limite).skip(desde)
    ]);

    res.json({
        total,
        listado
    })
};


const usuarioPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, constrasena, google, ...resto } = req.body;

    if (constrasena) {
        const salt = bcryptjs.genSaltSync(10);
        resto.constrasena = bcryptjs.hashSync(constrasena, salt);
    }

    //cconsole.log('resto', resto);


    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    console.log('usuario');



    res.json({
        usuario
    })
};

const usuarioPost = async (req = request, res = response) => {


    const { nombre, correo, constrasena, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, constrasena, rol });
    const salt = bcryptjs.genSaltSync(10);
    usuario.constrasena = bcryptjs.hashSync(constrasena, salt);

    await usuario.save();

    res.json({
        'msg': 'post Api - controllador',
        usuario
    })
}

const usuarioDelete = async (req, res) => {
   
    const {id} = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);
   
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json({
        usuario
    })
}

module.exports = { usuarioGet, usuarioPut, usuarioPost, usuarioDelete }