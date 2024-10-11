const {CrearUsuario, ActualizarUser, ListarUsuarios, getUserByEmail,BuscarUsuarioporid, Login, cerrarSesion} = require('../services/usuario.service')
const validarCamposRequeridos = require('../middleware/camposRequeridos');
const controller = {}; //define el controlador

controller.ListarUsuariosC = async function (req, res) {
    try {
        const usuarios = await ListarUsuarios(); //Llama al servicio para obtener los usuarios
        res.json(usuarios); //Si la operación es exitosa, se devuelve un estado 200 con los usuarios.
    } catch (error) {
        res.status(500).json({ error: error.message  }); //Si hay un error, se devuelve un estado 500 con el mensaje de error.
    }
}

controller.CrearUserC = async function (req, res) { 
    try {
        // Validar los campos del usuario
        validarCamposRequeridos(['identificacion', 'nombre', 'apellido','email',  'direccion', 'fecha_nacimiento', 'idRol']) (req, res, async()=>{

        
        const usuarioData = req.body; //valida los campos de usuarios

        if (!usuarioData.identificacion || !usuarioData.nombre || !usuarioData.apellido || !usuarioData.email  || !usuarioData.direccion || !usuarioData.fecha_nacimiento || !usuarioData.idRol) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const user = await CrearUsuario(usuarioData);//Si son correctos se crea el usuario
        res.status(201).json(user);//Si la operación es exitosa, se devuelve un estado 201 con el usuario creado.
    })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

controller.LoginC =  async function (req, res) {
    try{
        await Login(req, res);
    }catch(error){
        res.status(500)
    }
    
}

controller.ActualizarUserC = async function (req, res) {
    try{
        const usuarioDatos = req.body;
        const idUsuario = req.params.id;

        // Llamar al servicio para actualizar el usuario
        const user = await ActualizarUser(idUsuario, usuarioDatos)

        // Enviar la respuesta
        return res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
controller.GetUserByEmailC = async (req, res) => {
    const { email } = req.params;
    try {
        const usuario = await getUserByEmail(email);
        res.status(200).json(usuario);
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
}
module.exports = controller;


controller.BuscarUsuarioporid= async function (req, res) {
    try{
        const idUsuario = req.params.id;
        // Llamar al servicio para actualizar el usuario
        const user = await BuscarUsuarioporid(idUsuario)
        // Enviar la respuesta
        return res.status(201).json(user);
    }catch(error){
        res.status(500).json({error: error.message})

    }
    
}
controller.cerrarSesionC = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
       return res.status(401).json({ status: 401, error: 'No se proporcionó un token de autenticación' });
     }
   
      const token = req.headers['authorization']; 
   
      await cerrarSesion(token);
   
      res.status(200).json({message: 'Sesión cerrada exitosamente' });
     } catch (error) {
       next(error);
     }
   };

module.exports = controller;
//exporta el objeto controller que contiene la función CrearUserC, lo que permite que se pueda importar y utilizar en otros archivos.