<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/FotografiaUnidad.php');
class Controlador_fotografiaunidad extends Controlador_Base
{
   function crear($args)
   {
      $fotografiaunidad = new FotografiaUnidad($args["id"],$args["idUnidad"],$args["tipoArchivo"],$args["nombreArchivo"],$args["adjunto"]);
      $sql = "INSERT INTO FotografiaUnidad (idUnidad,tipoArchivo,nombreArchivo,adjunto) VALUES (?,?,?,?);";
      $parametros = array($fotografiaunidad->idUnidad,$fotografiaunidad->tipoArchivo,$fotografiaunidad->nombreArchivo,$fotografiaunidad->adjunto);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $fotografiaunidad = new FotografiaUnidad($args["id"],$args["idUnidad"],$args["tipoArchivo"],$args["nombreArchivo"],$args["adjunto"]);
      $parametros = array($fotografiaunidad->idUnidad,$fotografiaunidad->tipoArchivo,$fotografiaunidad->nombreArchivo,$fotografiaunidad->adjunto,$fotografiaunidad->id);
      $sql = "UPDATE FotografiaUnidad SET idUnidad = ?,tipoArchivo = ?,nombreArchivo = ?,adjunto = ? WHERE id = ?;";
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
      $sql = "DELETE FROM FotografiaUnidad WHERE id = ?;";
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
         $sql = "SELECT * FROM FotografiaUnidad;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM FotografiaUnidad WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM FotografiaUnidad LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM FotografiaUnidad;";
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
            $sql = "SELECT * FROM FotografiaUnidad WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM FotografiaUnidad WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM FotografiaUnidad WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM FotografiaUnidad WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}