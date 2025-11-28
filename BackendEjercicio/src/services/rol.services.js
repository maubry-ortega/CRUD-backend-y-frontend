import RolUsuario from '../models/rol.model.js';


export const CrearRol = async function (rolData) {
    if (!rolData.rol) {
        throw new Error('Todos los campos son requeridos');
    }
    try {
        const rolCreado = await RolUsuario.create(rolData);
        return rolCreado;
    }
    catch (error) {
        throw error;
    }
}

// export const ActulizarRol = async function(idRol, nuevoRol) {
//     try{
//         const rolActualizado = await RolUsuario.editRol(idRol, nuevoRol);
//         if (!rolActualizado){
//             throw new Error('No se pudo actualizar el rol, o el rol no existe.');
//         }
//         return rolActualizado;
//     }
//     catch (error) {
//         throw error;
//     }

// }

export const EditRol = async function (idRol, NuevoRol) {
    try {

        const rolActualizado = { ...idRol, ...NuevoRol }
        await RolUsuario.editRol(idRol, rolActualizado);

        return rolActualizado;
    }
    catch (error) {
        throw error;
    }
}

export const ListarUsuRol = async function (rolData) {
    try {
        const roles = await RolUsuario.findAll(rolData);
        return roles;
    }
    catch (error) {
        throw error;
    }

}




