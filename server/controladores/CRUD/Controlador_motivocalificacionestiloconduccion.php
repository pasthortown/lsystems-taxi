<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/MotivoCalificacionEstiloConduccion.php');
class Controlador_motivocalificacionestiloconduccion extends Controlador_Base
{
   function crear($args)
   {
      $motivocalificacionestiloconduccion = new MotivoCalificacionEstiloConduccion($args["id"],$args["descripcion"]);
      $sql = "INSERT INTO MotivoCalificacionEstiloConduccion (descripcion) VALUES (?);";
      $parametros = array($motivocalificacionestiloconduccion->descripcion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $motivocalificacionestiloconduccion = new MotivoCalificacionEstiloConduccion($args["id"],$args["descripcion"]);
      $parametros = array($motivocalificacionestiloconduccion->descripcion,$motivocalificacionestiloconduccion->id);
      $sql = "UPDATE MotivoCalificacionEstiloConduccion SET descripcion = ? WHERE id = ?;";
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
      $sql = "DELETE FROM MotivoCalificacionEstiloConduccion WHERE id = ?;";
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
         $sql = "SELECT * FROM MotivoCalificacionEstiloConduccion;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM MotivoCalificacionEstiloConduccion WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM MotivoCalificacionEstiloConduccion LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM MotivoCalificacionEstiloConduccion;";
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
            $sql = "SELECT * FROM MotivoCalificacionEstiloConduccion WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM MotivoCalificacionEstiloConduccion WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM MotivoCalificacionEstiloConduccion WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM MotivoCalificacionEstiloConduccion WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}