const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {

    const validar = await Role.findOne({ rol: rol })
    if (validar) {
        throw new Error('El rol no esta registrado en la BD');
    }

}

const correoExiste = async (correo = '') => {

    //verficar si correo existe 
    const exisMail = await Usuario.findOne({ correo });
    if (exisMail) {
        throw new Error('Correo ya registrado anteriormente');
    }


}


const existeUsuarioxID = async (id = '') => {

    //verficar si correo existe 
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
        throw new Error('El id no existe');
    }


}


module.exports = { esRoleValido, correoExiste, existeUsuarioxID }