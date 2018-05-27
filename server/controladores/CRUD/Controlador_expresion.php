<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Expresion.php');
class Controlador_expresion extends Controlador_Base
{
   function crear($args)
   {
      $expresion = new Expresion($args["id"],$args["idViaje"],$args["idUsuario"],$args["contenido"],$args["respuesta"],$args["idCalificacionUnidad"],$args["idCalificacionConductor"],$args["idCalificacionEstiloConduccion"],$args["idCalificacionUsuario"],$args["idMotivoCalificacionUsuario"],$args["idMotivoCalificacionUnidad"],$args["idMotivoCalificacionConductor"],$args["idMotivoCalificacionEstiloConduccion"],$args["idAdjunto"]);
      $sql = "INSERT INTO Expresion (idViaje,idUsuario,contenido,respuesta,idCalificacionUnidad,idCalificacionConductor,idCalificacionEstiloConduccion,idCalificacionUsuario,idMotivoCalificacionUsuario,idMotivoCalificacionUnidad,idMotivoCalificacionConductor,idMotivoCalificacionEstiloConduccion,idAdjunto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
      $parametros = array($expresion->idViaje,$expresion->idUsuario,$expresion->contenido,$expresion->respuesta,$expresion->idCalificacionUnidad,$expresion->idCalificacionConductor,$expresion->idCalificacionEstiloConduccion,$expresion->idCalificacionUsuario,$expresion->idMotivoCalificacionUsuario,$expresion->idMotivoCalificacionUnidad,$expresion->idMotivoCalificacionConductor,$expresion->idMotivoCalificacionEstiloConduccion,$expresion->idAdjunto);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $expresion = new Expresion($args["id"],$args["idViaje"],$args["idUsuario"],$args["contenido"],$args["respuesta"],$args["idCalificacionUnidad"],$args["idCalificacionConductor"],$args["idCalificacionEstiloConduccion"],$args["idCalificacionUsuario"],$args["idMotivoCalificacionUsuario"],$args["idMotivoCalificacionUnidad"],$args["idMotivoCalificacionConductor"],$args["idMotivoCalificacionEstiloConduccion"],$args["idAdjunto"]);
      $parametros = array($expresion->idViaje,$expresion->idUsuario,$expresion->contenido,$expresion->respuesta,$expresion->idCalificacionUnidad,$expresion->idCalificacionConductor,$expresion->idCalificacionEstiloConduccion,$expresion->idCalificacionUsuario,$expresion->idMotivoCalificacionUsuario,$expresion->idMotivoCalificacionUnidad,$expresion->idMotivoCalificacionConductor,$expresion->idMotivoCalificacionEstiloConduccion,$expresion->idAdjunto,$expresion->id);
      $sql = "UPDATE Expresion SET idViaje = ?,idUsuario = ?,contenido = ?,respuesta = ?,idCalificacionUnidad = ?,idCalificacionConductor = ?,idCalificacionEstiloConduccion = ?,idCalificacionUsuario = ?,idMotivoCalificacionUsuario = ?,idMotivoCalificacionUnidad = ?,idMotivoCalificacionConductor = ?,idMotivoCalificacionEstiloConduccion = ?,idAdjunto = ? WHERE id = ?;";
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
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Unidad ON Unidad.id = Viaje.idUnidad WHERE Expresion.$nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Unidad ON Unidad.id = Viaje.idUnidad WHERE Expresion.$nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Unidad ON Unidad.id = Viaje.idUnidad WHERE Expresion.$nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT Expresion.*, Unidad.numero, Unidad.placa FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Unidad ON Unidad.id = Viaje.idUnidad WHERE Expresion.$nombreColumna LIKE '%$filtro%';";
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

   function leer_estadisticas_viajes_unidad($args)
   {
      $idUnidad = $args["idUnidad"];
      $sql = "SELECT DATE(Viaje.fechaInicio) as 'Fecha', COUNT(*) as 'Cuenta' FROM Viaje WHERE idUnidad = ? GROUP BY DATE(Viaje.fechaInicio)";
      $asc = $args["asc"];
      if($asc){
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) ASC;';
      }else {
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) DESC;';
      }
      $parametros = array($idUnidad);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estadisticas_viajes_unidad($args)
   {
      $idUnidad = $args["idUnidad"];
      $sql = "SELECT DATE(Viaje.fechaInicio) as 'Fecha', COUNT(*) as 'Cuenta' FROM Viaje WHERE idUnidad = ? GROUP BY DATE(Viaje.fechaInicio)";
      $asc = $args["asc"];
      if($asc){
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) ASC;';
      }else {
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) DESC;';
      }
      $parametros = array($idUnidad);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estadisticas_unidad($args)
   {
      $idUnidad = $args["idUnidad"];
      $sql = "SELECT DATE(Viaje.fechaInicio) as 'Fecha', COUNT(*) as 'Cuenta' FROM Viaje WHERE idUnidad = ? GROUP BY DATE(Viaje.fechaInicio)";
      $asc = $args["asc"];
      if($asc){
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) ASC;';
      }else {
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) DESC;';
      }
      $parametros = array($idUnidad);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estrellas_unidad($args)
   {
      $id = $args["id"];
      $sql = "SELECT Expresion.idCalificacionUsuario, count(Expresion.idCalificacionUsuario) as Cuenta FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Persona ON Viaje.idUsuario = Persona.id WHERE Persona.id = ? GROUP BY Expresion.idCalificacionUsuario;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estrellas_cliente($args)
   {
      $id = $args["id"];
      $sql = "SELECT Expresion.idCalificacionUnidad, count(Expresion.idCalificacionUnidad) as Cuenta FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Unidad ON Viaje.idUnidad = Unidad.id WHERE Unidad.id = ? GROUP BY Expresion.idCalificacionUnidad;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estrellas_conductor($args)
   {
      $id = $args["id"];
      $sql = "SELECT Expresion.idCalificacionConductor, count(Expresion.idCalificacionConductor) as Cuenta FROM Expresion INNER JOIN Viaje ON Viaje.id = Expresion.idViaje INNER JOIN Persona ON Viaje.idConductor = Persona.id WHERE Persona.id = ? GROUP BY Expresion.idCalificacionConductor;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}