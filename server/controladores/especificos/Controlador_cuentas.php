<?php
include_once('../controladores/Controlador_Base.php');
include_once('../controladores/especificos/Controlador_login.php');

class Controlador_cuentas extends Controlador_Base
{
   function cuentas_clientes($args)
   {
      $rol = $args["rol"];
      $parametros = array($rol);
      $sql = "SELECT Persona.*, EstadoCuenta.descripcion as 'EstadoCuenta', Cuenta.idEstadoCuenta FROM Persona INNER JOIN Cuenta ON Cuenta.idPersona = Persona.id INNER JOIN EstadoCuenta ON Cuenta.idEstadoCuenta = EstadoCuenta.id INNER JOIN Rol ON Cuenta.idRol = Rol.id WHERE Rol.descripcion = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
   
   function crear_cuenta($args)
   {
      $identificacion = $args["identificacion"];
      $nombres = $args["nombres"];
      $apellidos = $args["apellidos"];
      $idGenero = $args["idGenero"];
      $direccion = $args["direccion"];
      $telefono1 = $args["telefono1"];
      $telefono2 = $args["telefono2"];
      $correoElectronico = $args["correoElectronico"];
      $idRol = $args["idRol"];
      $idEstadoCuenta = $args["idEstadoCuenta"];
      $parametros = array($identificacion,$nombres,$apellidos,$idGenero,$direccion,$telefono1,$telefono2,$correoElectronico);
      $sql = "INSERT INTO Persona (identificacion, nombres, apellidos, idGenero, direccion, telefono1, telefono2, correoElectronico) VALUES (?,?,?,?,?,?,?,?);";
      $insert = $this->conexion->ejecutarConsulta($sql,$parametros);
      $sql = "SELECT * FROM Persona WHERE identificacion = ?;";
      $parametros = array($identificacion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      $idPersona = $respuesta[0]["id"];
      $parametros = array($idPersona, $idRol,$idEstadoCuenta);
      $sql = "INSERT INTO Cuenta (idPersona, idRol, idEstadoCuenta) VALUES (?,?,?);";
      $cuenta = $this->conexion->ejecutarConsulta($sql,$parametros);
      $mailSender = new Controlador_login();
      $args = array("email"=>$correoElectronico, "accion"=>"Tu cuenta en LSystems-Taxi");
      return $mailSender->passwordChange($args);
   }

   function actualizar_cuenta($args)
   {
      $idPersona = $args["idPersona"];
      $identificacion = $args["identificacion"];
      $nombres = $args["nombres"];
      $apellidos = $args["apellidos"];
      $idGenero = $args["idGenero"];
      $direccion = $args["direccion"];
      $telefono1 = $args["telefono1"];
      $telefono2 = $args["telefono2"];
      $correoElectronico = $args["correoElectronico"];
      $idEstadoCuenta = $args["idEstadoCuenta"];
      $parametros = array($identificacion,$nombres,$apellidos,$idGenero,$direccion,$telefono1,$telefono2,$correoElectronico, $idPersona);
      $sql = "UPDATE Persona SET identificacion = ?,nombres = ?,apellidos = ?,idGenero = ?,direccion = ?,telefono1 = ?,telefono2 = ?,correoElectronico = ? WHERE id = ?;";
      $updatePersona = $this->conexion->ejecutarConsulta($sql,$parametros);
      $parametros = array($idEstadoCuenta, $idPersona);
      $sql = "UPDATE Cuenta SET idEstadoCuenta = ? WHERE idPersona = ?;";
      $updateCuenta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return true;
   }
}