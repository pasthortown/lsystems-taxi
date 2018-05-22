<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Viaje.php');
class Controlador_viaje extends Controlador_Base
{
   function crear($args)
   {
      $viaje = new Viaje($args["id"],$args["fechaInicio"],$args["fechaFin"],$args["latDesde"],$args["lngDesde"],$args["latHasta"],$args["lngHasta"],$args["idUnidad"],$args["idUsuario"],$args["idConductor"]);
      $sql = "INSERT INTO Viaje (fechaInicio,fechaFin,latDesde,lngDesde,latHasta,lngHasta,idUnidad,idUsuario,idConductor) VALUES (?,?,?,?,?,?,?,?,?);";
      $fechaInicioNoSQLTime = strtotime($viaje->fechaInicio);
      $fechaInicioSQLTime = date("Y-m-d H:i:s", $fechaInicioNoSQLTime);
      $viaje->fechaInicio = $fechaInicioSQLTime;
      $fechaFinNoSQLTime = strtotime($viaje->fechaFin);
      $fechaFinSQLTime = date("Y-m-d H:i:s", $fechaFinNoSQLTime);
      $viaje->fechaFin = $fechaFinSQLTime;
      $parametros = array($viaje->fechaInicio,$viaje->fechaFin,$viaje->latDesde,$viaje->lngDesde,$viaje->latHasta,$viaje->lngHasta,$viaje->idUnidad,$viaje->idUsuario,$viaje->idConductor);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $viaje = new Viaje($args["id"],$args["fechaInicio"],$args["fechaFin"],$args["latDesde"],$args["lngDesde"],$args["latHasta"],$args["lngHasta"],$args["idUnidad"],$args["idUsuario"],$args["idConductor"]);
      $parametros = array($viaje->fechaInicio,$viaje->fechaFin,$viaje->latDesde,$viaje->lngDesde,$viaje->latHasta,$viaje->lngHasta,$viaje->idUnidad,$viaje->idUsuario,$viaje->idConductor,$viaje->id);
      $sql = "UPDATE Viaje SET fechaInicio = ?,fechaFin = ?,latDesde = ?,lngDesde = ?,latHasta = ?,lngHasta = ?,idUnidad = ?,idUsuario = ?,idConductor = ? WHERE id = ?;";
      $fechaInicioNoSQLTime = strtotime($viaje->fechaInicio);
      $fechaInicioSQLTime = date("Y-m-d H:i:s", $fechaInicioNoSQLTime);
      $viaje->fechaInicio = $fechaInicioSQLTime;
      $fechaFinNoSQLTime = strtotime($viaje->fechaFin);
      $fechaFinSQLTime = date("Y-m-d H:i:s", $fechaFinNoSQLTime);
      $viaje->fechaFin = $fechaFinSQLTime;
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
      $sql = "DELETE FROM Viaje WHERE id = ?;";
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
         $sql = "SELECT * FROM Viaje;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Viaje WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Viaje LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Viaje;";
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
            $sql = "SELECT * FROM Viaje WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Viaje WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Viaje WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Viaje WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}