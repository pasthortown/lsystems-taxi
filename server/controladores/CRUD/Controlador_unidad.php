<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Unidad.php');
class Controlador_unidad extends Controlador_Base
{
   function crear($args)
   {
      $unidad = new Unidad($args["id"],$args["idCoperativa"],$args["placa"],$args["numero"],$args["anoFabricacion"],$args["registroMunicipal"]);
      $sql = "INSERT INTO Unidad (idCoperativa,placa,numero,anoFabricacion,registroMunicipal) VALUES (?,?,?,?,?);";
      $parametros = array($unidad->idCoperativa,$unidad->placa,$unidad->numero,$unidad->anoFabricacion,$unidad->registroMunicipal);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $unidad = new Unidad($args["id"],$args["idCoperativa"],$args["placa"],$args["numero"],$args["anoFabricacion"],$args["registroMunicipal"]);
      $parametros = array($unidad->idCoperativa,$unidad->placa,$unidad->numero,$unidad->anoFabricacion,$unidad->registroMunicipal,$unidad->id);
      $sql = "UPDATE Unidad SET idCoperativa = ?,placa = ?,numero = ?,anoFabricacion = ?,registroMunicipal = ? WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function borrar($args)
   {
      $id = $args["id"];
      $parametros = array($id);
      $sql = "DELETE FROM Unidad WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function leer($args)
   {
      $id = $args["id"];
      if ($id==""){
         $sql = "SELECT * FROM Unidad;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Unidad WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Unidad LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Unidad;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta[0];
   }

   function leer_filtrado($args)
   {
      $nombreColumna = $args["columna"];
      $tipoFiltro = $args["tipo_filtro"];
      $filtro = $args["filtro"];
      switch ($tipoFiltro){
         case "coincide":
            $parametros = array($filtro);
            $sql = "SELECT * FROM Unidad WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Unidad WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Unidad WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Unidad WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}