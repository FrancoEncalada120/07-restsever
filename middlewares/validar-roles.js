const { response, request } = require("express");


const validarRoleAdm = (req = request, res = response, next) => {

    if (!req.usuarioAuth) {
        return res.status(500).json({
            msg: "No es un usuario autentificado del token"
        });

    }
    const { rol, nombre } = req.usuarioAuth;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: `${nombre} no es admin`
        });

    }

    next();

}

const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.usuarioAuth) {
            return res.status(500).json({
                msg: "No es un usuario autentificado del token"
            });

        }

        const { rol } = req.usuarioAuth;
        if (!roles.includes(rol)) {
            return res.status(401).json({
                msg: `El servicio requiere estos roles: ${roles} `
            });

        }

        next();
    }


}


module.exports = { validarRoleAdm, tieneRol };