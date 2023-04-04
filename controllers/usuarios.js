const { response } = require('express')


const usuarioGet = (req, res) => {

    const { a, q, c = "No c" } = req.query;


    res.json({
        'msg': 'get Api - controllador',
        a, q, c
    })
};


const usuarioPut = (req, res) => {

    const { id } = req.params;

    res.json({
        'msg': 'put Api - controllador',
        id
    })
};

const usuarioPost = (req, res) => {


    const { nombre, edad } = req.body;
    console.log(req.body);

    res.json({
        'msg': 'post Api - controllador',
        nombre, edad
    })
}

const usuarioDelete = (req, res) => {
    res.json({
        'msg': 'delete Api - controllador'
    })
}

module.exports = { usuarioGet, usuarioPut, usuarioPost, usuarioDelete }