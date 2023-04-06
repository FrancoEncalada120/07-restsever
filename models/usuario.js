const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    constrasena: {
        type: String,
        required: [true, 'La constraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }

});

UsuarioSchema.methods.toJSON = function () {
    const { constrasena, __v, ...usuario } = this.toObject();
    return usuario;
}



module.exports = model('Usuario', UsuarioSchema); 