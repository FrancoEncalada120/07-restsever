const { Router } = require('express');
const { usuarioGet, usuarioPost, usuarioDelete, usuarioPut } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { esRoleValido, correoExiste, existeUsuarioxID } = require('../helpers/db-validator');


const validarCampos = require('../middlewares/validar-campos');
//const { validarjwt } = require('../middlewares/validar-jwt');
//const {validarRoleAdm, tieneRol} = require('../middlewares/validar-roles');
 const {
    // validarCampos,
     validarjwt,
     validarRoleAdm,
     tieneRol
 } = require('../middlewares');

const router = Router();


router.get('/', usuarioGet);

router.put('/:id', [

    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioxID),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPut);

router.post('/', [
    check('nombre', 'El correo no es valido').not().isEmpty(),
    check('constrasena', 'El password debe ser de 6 digitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),  // es i mismo: check('rol').custom(rol => esRoleValido(rol))
    validarCampos
], usuarioPost);

router.delete('/:id', [
    validarjwt,
    //validarRoleAdm,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioxID),
    validarCampos

], usuarioDelete);


module.exports = router;