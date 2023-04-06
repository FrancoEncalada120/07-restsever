
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {


    const validationErros = validationResult(req)
    console.log('validationErros', validationErros);
    if (!validationErros.isEmpty())
        return res.status(400).json(validationErros);


        next();

}

module.exports = validarCampos;