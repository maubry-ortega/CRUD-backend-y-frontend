-- Script SQL para crear las tablas necesarias en la base de datos

-- Crear tabla Tienda (si no existe)
CREATE TABLE IF NOT EXISTS Tienda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Rol (si no existe)
CREATE TABLE IF NOT EXISTS Rol (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Usuario (si no existe)
CREATE TABLE IF NOT EXISTS Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    idRol INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idRol) REFERENCES Rol(idRol) ON DELETE SET NULL
);

-- Crear tabla PRODUCTO (si no existe)
CREATE TABLE IF NOT EXISTS PRODUCTO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    id_tienda INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tienda) REFERENCES Tienda(id) ON DELETE SET NULL
);

-- Crear tabla Venta (si no existe)
CREATE TABLE IF NOT EXISTS Venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_venta DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE SET NULL
);

-- Insertar una tienda por defecto si no existe
INSERT INTO Tienda (id, nombre, direccion, telefono)
SELECT 1, 'Tienda Principal', 'Av. Principal 123', '555-0100'
WHERE NOT EXISTS (SELECT 1 FROM Tienda WHERE id = 1);

-- Insertar roles por defecto si no existen
INSERT INTO Rol (rol)
SELECT 'Administrador'
WHERE NOT EXISTS (SELECT 1 FROM Rol WHERE rol = 'Administrador');

INSERT INTO Rol (rol)
SELECT 'Usuario'
WHERE NOT EXISTS (SELECT 1 FROM Rol WHERE rol = 'Usuario');

INSERT INTO Rol (rol)
SELECT 'Vendedor'
WHERE NOT EXISTS (SELECT 1 FROM Rol WHERE rol = 'Vendedor');
