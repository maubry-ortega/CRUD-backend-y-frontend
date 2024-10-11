const {CrearRol, ActulizarRol, ListarUsuRol, EditRol} = require('../services/rol.services');
const validarCamposRequeridos = require('../middleware/camposRequeridos');
const controller = {};

controller.EditRolC = async function (req, res) {
    try{
        const rolDatos = req.body;
        const idRol = req.params.id;

        const user = await EditRol(idRol, rolDatos)
        return res.status(201).json({message: 'perfil actualizado exitosamente', data: user });
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
}

// controller.ActulizarRolC = async function (req, res) {
//     try{
//         const rolDatos = req.body;
//         const idRol = req.params.id;

//         const user = await ActulizarRol(idRol, rolDatos)
//         return res.status(201).json(user);
//     }
//     catch (error){
//         res,status(500).json({error: error.message});
//     }
// }

controller.ListarUsuRolC = async function (req, res) {
    try {
        const usuarios = await ListarUsuRol(RolData);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message  });
    }
}

controller.CrearRolC = async function (req, res) {
    try{
        validarCamposRequeridos(['rol' ]) (req, res, async()=>{
            
            const rolData = req.body;
            if( !rolData.rol ){
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            } 

            const usuario = await CrearRol(rolData);
            res.status(201).json(usuario);
        })
    }
    catch (error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = controller;




















const crearUserC = async function (req, res) {
    const usuarioData = req.body;
    try {
        const usuario = await Usuario.create(usuarioData);
        const rol = await crearRol({ nombreRol: 'Rol de prueba', descripcionRol: 'Descripción del rol' });
        await asignarRol(usuario.idUsuario, rol.idRol);
        res.json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};