<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/MotivoCalificacionConductor.php');
class Controlador_motivocalificacionconductor extends Controlador_Base
{
   function crear($args)
   {
      $motivocalificacionconductor = new MotivoCalificacionConductor($args["id"],$args["descripcion"]);
      $sql = "INSERT INTO MotivoCalificacionConductor (descripcion) VALUES (?);";
      $parametros = array($motivocalificacionconductor->descripcion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $motivocalificacionconductor = new MotivoCalificacionConductor($args["id"],$args["descripcion"]);
      $parametros = array($motivocalificacionconductor->descripcion,$motivocalificacionconductor->id);
      $sql = "UPDATE MotivoCalificacionConductor SET descripcion = ? WHERE id = ?;";
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
      $sql = "DELETE FROM MotivoCalificacionConductor WHERE id = ?;";
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
         $sql = "SELECT * FROM MotivoCalificacionConductor ORDER BY id ASC;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM MotivoCalificacionConductor WHERE id = ? ORDER BY id ASC;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM MotivoCalificacionConductor ORDER BY id ASC LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM MotivoCalificacionConductor ORDER BY id ASC;";
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
            $sql = "SELECT * FROM MotivoCalificacionConductor WHERE $nombreColumna = ? ORDER BY id ASC;";
            break;
         case "inicia":
            $sql = "SELECT * FROM MotivoCalificacionConductor WHERE $nombreColumna LIKE '$filtro%' ORDER BY id ASC;";
            break;
         case "termina":
            $sql = "SELECT * FROM MotivoCalificacionConductor WHERE $nombreColumna LIKE '%$filtro' ORDER BY id ASC;";
            break;
         default:
            $sql = "SELECT * FROM MotivoCalificacionConductor WHERE $nombreColumna LIKE '%$filtro%' ORDER BY id ASC;";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}