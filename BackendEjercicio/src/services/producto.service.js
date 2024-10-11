
const Producto = require('../models/producto.model');

const productoService = {

    crearProducto: async function (ProductoData) {

        const{Nombre, Descripcion, Precio, Stock, IdTienda} = ProductoData;
        
        if(!Nombre || !Descripcion || !Precio || !Stock || !IdTienda){
            throw new Error ('Todos los campos son requeridos.')
        }

        try {
            const result = await Producto.create(ProductoData);
            return result;

        } catch (error) {
            throw new Error('Error cuando se creo el producto' + error.message);
        }
    },

    ListarProductos: async function (){
        try {
            const [productos] = await Producto.findAll();
            return productos;
        } catch (error) {
            throw new Error ('error al obtener productos ' + error.message);
        }
    },

    ListarProductosId: async function (id) {


        try {
            const productosId = await Producto.findById(id);
            return productosId;
        } catch (error) {
            throw new Error ('Error al obtener el producto ' + error.message)
        }
    },

    ActualizarProducto: async function (id, ProductoData) {
        console.log(id)
        console.log(ProductoData)

        const{Nombre, Descripcion, Precio, Stock, IdTienda} = ProductoData;

        if (!Nombre || !Descripcion|| !Precio || !Stock || !IdTienda) {
            throw new Error('Todos los campos son requeridos para la actualización.');
        }

        try {
            await Producto.update(id, ProductoData);
            return { message: 'producto actualizado correctamente' };
        } catch (error) {
            throw new Error ('error al actualizar el producto' + error.message);
        }
    },

    EliminarProducto: async function (id) {
        
        try {
            const result = await Producto.delete(id);

            if (result[0].affectedRows === 0){
                throw new Error('Producto no encontrado');
            }
            return { message: 'Producto eliminado correctamente'};
        } catch (error) {
            throw new Error('Error al eliminar el producto ' + error.message);
        }
    }

}

module.exports = productoService;