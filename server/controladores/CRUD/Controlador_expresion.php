<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Expresion.php');
include_once('../controladores/especificos/Controlador_mail_sender.php');

class Controlador_expresion extends Controlador_Base
{
   function crear($args)
   {
      $expresion = new Expresion($args["id"],$args["idUsuario"],$args["idUnidad"],$args["contenido"],$args["respuesta"],$args["idCalificacion"],$args["idAdjunto"]);
      $sql = "INSERT INTO Expresion (idUsuario,idUnidad,contenido,respuesta,idCalificacion,idAdjunto) VALUES (?,?,?,?,?,?);";
      $parametros = array($expresion->idUsuario,$expresion->idUnidad,$expresion->contenido,$expresion->respuesta,$expresion->idCalificacion,$expresion->idAdjunto);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $expresion = new Expresion($args["id"],$args["idUsuario"],$args["idUnidad"],$args["contenido"],$args["respuesta"],$args["idCalificacion"],$args["idAdjunto"]);
      $parametros = array($expresion->idUsuario,$expresion->idUnidad,$expresion->contenido,$expresion->respuesta,$expresion->idCalificacion,$expresion->idAdjunto,$expresion->id);
      $sql = "UPDATE Expresion SET idUsuario = ?,idUnidad = ?,contenido = ?,respuesta = ?,idCalificacion = ?,idAdjunto = ? WHERE id = ?;";
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
      $sql = "DELETE FROM Expresion WHERE id = ?;";
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
         $sql = "SELECT * FROM Expresion;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Expresion WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($args)
   {
      $pagina = $args["pagina"];
      $registrosPorPagina = $args["registros_por_pagina"];
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM Expresion LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($args)
   {
      $registrosPorPagina = $args["registros_por_pagina"];
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM Expresion;";
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
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Unidad ON Unidad.id = Expresion.idUnidad WHERE Expresion.$nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Unidad ON Unidad.id = Expresion.idUnidad WHERE Expresion.$nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Unidad ON Unidad.id = Expresion.idUnidad WHERE Expresion.$nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Unidad ON Unidad.id = Expresion.idUnidad WHERE Expresion.$nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function enviarRespuesta($args){
      $email = $args["email"];
      $usuario = $args["usuario"];
      $respuesta = $args["respuesta"];
      $accion = 'Servicio al Cliente';
      $mailSender = new Controlador_mail_sender();
      $cuerpoMensaje = '<div style="width:90%; float:left;"><div style="width:100%; float:left; border: 1px solid black; border-radius: 10px;"><div style="width:100%; float:left; padding-top:5px; padding-bottom:5px; font-family: Arial, Helvetica, sans-serif; background-color: darkblue; color: white; border-radius: 10px 10px 0px 0px;">&nbsp;';
      $cuerpoMensaje .= ALIASMAIL;
      $cuerpoMensaje .= '</div><div style="width:100%; float:left; text-align: center">';
      $cuerpoMensaje .= '<h3>'.$accion.'</h3>';
      $cuerpoMensaje .= '<div style="width:100%; float:left; text-align: left">';
      $cuerpoMensaje .= '<p>'.$respuesta.'</p>';
      $cuerpoMensaje .= '</div></div></div>';
      return $mailSender->enviarMail(FROMMAIL, ALIASMAIL, CLAVEMAIL, 'no-responder@noresponder.com',ALIASMAIL,$email,$usuario,$cuerpoMensaje,$accion);
   }
}