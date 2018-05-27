<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Posicion.php');
class Controlador_posicion extends Controlador_Base
{
   function crear($args)
   {
      $posicion = new Posicion($args["id"],$args["idUnidad"],$args["tiempo"],$args["latitud"],$args["longitud"],$args["velocidad"]);
      $sql = "INSERT INTO Posicion (idUnidad,tiempo,latitud,longitud,velocidad) VALUES (?,?,?,?,?);";
      $tiempoNoSQLTime = strtotime($posicion->tiempo);
      $tiempoSQLTime = date("Y-m-d H:i:s", $tiempoNoSQLTime);
      $posicion->tiempo = $tiempoSQLTime;
      $parametros = array($posicion->idUnidad,$posicion->tiempo,$posicion->latitud,$posicion->longitud,$posicion->velocidad);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $posicion = new Posicion($args["id"],$args["idUnidad"],$args["tiempo"],$args["latitud"],$args["longitud"],$args["velocidad"]);
      $tiempoNoSQLTime = strtotime($posicion->tiempo)-(5*3600);
      $tiempoSQLTime = date("Y-m-d H:i:s", $tiempoNoSQLTime);
      $posicion->tiempo = $tiempoSQLTime;
      $parametros = array($posicion->idUnidad,$posicion->tiempo,$posicion->latitud,$posicion->longitud,$posicion->velocidad,$posicion->id);
      $sql = "UPDATE Posicion SET idUnidad = ?,tiempo = ?,latitud = ?,longitud = ?,velocidad = ? WHERE id = ?;";
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
      $sql = "DELETE FROM Posicion WHERE id = ?;";
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
         $sql = "SELECT * FROM Posicion;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Posicion WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Posicion LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Posicion;";
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
            $sql = "SELECT * FROM Posicion WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Posicion WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Posicion WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Posicion WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_posicions_actuales($args) {
      $idUnidad = $args["idUnidad"];
      if ($idUnidad==""){
         $sql = "SELECT Posicion.id, a.idUnidad, a.tiempo, Posicion.latitud, Posicion.longitud, Posicion.velocidad, Unidad.numero, Unidad.placa, Unidad.registroMunicipal, Unidad.anoFabricacion, Unidad.idEstadoUnidad FROM (SELECT Posicion.idUnidad, MAX(Posicion.tiempo) as 'tiempo' FROM Posicion GROUP BY idUnidad) a INNER JOIN Unidad ON a.idUnidad = Unidad.id INNER JOIN Posicion ON Posicion.idUnidad = a.idUnidad WHERE Posicion.tiempo = a.tiempo;";
      }else{
      $parametros = array($idUnidad);
         $sql = "SELECT Posicion.id, a.idUnidad, a.tiempo, Posicion.latitud, Posicion.longitud, Posicion.velocidad, Unidad.numero, Unidad.placa, Unidad.registroMunicipal, Unidad.anoFabricacion, Unidad.idEstadoUnidad FROM (SELECT Posicion.idUnidad, MAX(Posicion.tiempo) as 'tiempo' FROM Posicion GROUP BY idUnidad) a INNER JOIN Unidad ON a.idUnidad = Unidad.id INNER JOIN Posicion ON Posicion.idUnidad = a.idUnidad WHERE Posicion.tiempo = a.tiempo AND Posicion.idUnidad = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}