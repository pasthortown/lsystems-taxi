CREATE DATABASE LSystemsTaxi DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE LSystemsTaxi;

CREATE TABLE Coperativa (
    id INT NOT NULL AUTO_INCREMENT,
    RUC VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NULL UNIQUE,
    direccion VARCHAR(100) NULL,
    telefono1 VARCHAR(20) NULL,
    telefono2 VARCHAR(20) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Unidad (
    id INT NOT NULL AUTO_INCREMENT,
    idCoperativa INT NOT NULL,
    placa VARCHAR(10) NULL UNIQUE,
    numero INT NULL,
    anoFabricacion INT NULL,
    registroMunicipal VARCHAR(10) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Viaje (
    id INT NOT NULL AUTO_INCREMENT,
    fechaInicio DATETIME NULL,
    fechaFin DATETIME NULL,
    latDesde VARCHAR(255) NULL,
    lngDesde VARCHAR(255) NULL,
    latHasta VARCHAR(255) NULL,
    lngHasta VARCHAR(255) NULL,
    idUnidad INT NULL,
    idUsuario INT NULL,
    idConductor INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Persona (
    id INT NOT NULL AUTO_INCREMENT,
    identificacion VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(50) NULL,
    apellidos VARCHAR(50) NULL,
    idGenero INT NULL,
    direccion VARCHAR(100) NULL,
    telefono1 VARCHAR(20) NULL,
    telefono2 VARCHAR(20) NULL,
    correoElectronico VARCHAR(100) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Genero (
    id INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(20) NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE FotografiaPersona (
    id INT NOT NULL AUTO_INCREMENT,
    idPersona INT NULL UNIQUE,
	tipoArchivo VARCHAR(255) NULL,
	nombreArchivo VARCHAR(255) NULL,
	adjunto LONGBLOB NULL,
	PRIMARY KEY (id)
) ENGINE myISAM;

CREATE TABLE FotografiaUnidad (
    id INT NOT NULL AUTO_INCREMENT,
    idUnidad INT NULL UNIQUE,
	tipoArchivo VARCHAR(255) NULL,
	nombreArchivo VARCHAR(255) NULL,
	adjunto LONGBLOB NULL,
	PRIMARY KEY (id)
) ENGINE myISAM;

CREATE TABLE Cuenta (
    id INT NOT NULL AUTO_INCREMENT,
    idPersona INT NULL,
    idRol INT NULL,
    clave BLOB NULL,
    PRIMARY KEY (id)
);

ALTER TABLE Cuenta ADD CONSTRAINT unicidadCuenta UNIQUE (idPersona, idRol);

CREATE TABLE Rol (
    id INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(50) NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE Expresion (
    id INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idUnidad INT NULL,
    contenido VARCHAR(500) NULL,
    respuesta VARCHAR(500) NULL,
    idCalificacion INT NULL,
    idAdjunto INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Calificacion (
    id INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(50) NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE Adjunto (
    id INT NOT NULL AUTO_INCREMENT,
	tipoArchivo VARCHAR(255) NULL,
	nombreArchivo VARCHAR(255) NULL,
	adjunto LONGBLOB NULL,
	PRIMARY KEY (id)
) ENGINE myISAM;

CREATE TABLE Posicion (
    id INT NOT NULL AUTO_INCREMENT,
	idUnidad INT NULL,
	tiempo DATETIME NULL,
    latitud VARCHAR(255) NULL,
    longitud VARCHAR(255) NULL,
    velocidad VARCHAR(255) NULL,
	PRIMARY KEY (id)
) ENGINE myISAM;