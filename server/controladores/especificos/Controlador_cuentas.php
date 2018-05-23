<?php
include_once('../controladores/Controlador_Base.php');
class Controlador_cuentas extends Controlador_Base
{
   function cuentas_clientes($args)
   {
      $rol = $args["rol"];
      $parametros = array($rol);
      $sql = "SELECT Persona.* FROM Persona INNER JOIN Cuenta ON Cuenta.idPersona = Persona.id INNER JOIN Rol ON Cuenta.idRol = Rol.id WHERE Rol.descripcion = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   } 
}