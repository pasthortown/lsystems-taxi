<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/FotografiaPersona.php');
class Controlador_fotografiapersona extends Controlador_Base
{
   function crear($args)
   {
      $fotografiapersona = new FotografiaPersona($args["id"],$args["idPersona"],$args["tipoArchivo"],$args["nombreArchivo"],$args["adjunto"]);
      $sql = "INSERT INTO FotografiaPersona (idPersona,tipoArchivo,nombreArchivo,adjunto) VALUES (?,?,?,?);";
      $parametros = array($fotografiapersona->idPersona,$fotografiapersona->tipoArchivo,$fotografiapersona->nombreArchivo,$fotografiapersona->adjunto);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $fotografiapersona = new FotografiaPersona($args["id"],$args["idPersona"],$args["tipoArchivo"],$args["nombreArchivo"],$args["adjunto"]);
      $parametros = array($fotografiapersona->idPersona,$fotografiapersona->tipoArchivo,$fotografiapersona->nombreArchivo,$fotografiapersona->adjunto,$fotografiapersona->id);
      $sql = "UPDATE FotografiaPersona SET idPersona = ?,tipoArchivo = ?,nombreArchivo = ?,adjunto = ? WHERE id = ?;";
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
      $sql = "DELETE FROM FotografiaPersona WHERE id = ?;";
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
         $sql = "SELECT * FROM FotografiaPersona;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM FotografiaPersona WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM FotografiaPersona LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM FotografiaPersona;";
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
            $sql = "SELECT * FROM FotografiaPersona WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM FotografiaPersona WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM FotografiaPersona WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM FotografiaPersona WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}