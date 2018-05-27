<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/MotivoCalificacionUsuario.php');
class Controlador_motivocalificacionusuario extends Controlador_Base
{
   function crear($args)
   {
      $motivocalificacionusuario = new MotivoCalificacionUsuario($args["id"],$args["descripcion"]);
      $sql = "INSERT INTO MotivoCalificacionUsuario (descripcion) VALUES (?);";
      $parametros = array($motivocalificacionusuario->descripcion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $motivocalificacionusuario = new MotivoCalificacionUsuario($args["id"],$args["descripcion"]);
      $parametros = array($motivocalificacionusuario->descripcion,$motivocalificacionusuario->id);
      $sql = "UPDATE MotivoCalificacionUsuario SET descripcion = ? WHERE id = ?;";
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
      $sql = "DELETE FROM MotivoCalificacionUsuario WHERE id = ?;";
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
         $sql = "SELECT * FROM MotivoCalificacionUsuario;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM MotivoCalificacionUsuario WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM MotivoCalificacionUsuario LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM MotivoCalificacionUsuario;";
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
            $sql = "SELECT * FROM MotivoCalificacionUsuario WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM MotivoCalificacionUsuario WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM MotivoCalificacionUsuario WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM MotivoCalificacionUsuario WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}