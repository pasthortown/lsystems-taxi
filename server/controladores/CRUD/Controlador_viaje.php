<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/CRUD/Viaje.php');
class Controlador_viaje extends Controlador_Base
{
   function crear($args)
   {
      $viaje = new Viaje($args["id"],$args["fechaInicio"],$args["fechaFin"],$args["latDesde"],$args["lngDesde"],$args["latHasta"],$args["lngHasta"],$args["idUnidad"],$args["idUsuario"],$args["idConductor"],$args["idEstadoViaje"],$args["idMotivoEstado"],$args["costoReal"],$args["costoCalculado"]);
      $sql = "INSERT INTO Viaje (fechaInicio,fechaFin,latDesde,lngDesde,latHasta,lngHasta,idUnidad,idUsuario,idConductor,idEstadoViaje,idMotivoEstado,costoReal,costoCalculado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
      $fechaInicioNoSQLTime = strtotime($viaje->fechaInicio);
      $fechaInicioSQLTime = date("Y-m-d H:i:s", $fechaInicioNoSQLTime);
      $viaje->fechaInicio = $fechaInicioSQLTime;
      $fechaFinNoSQLTime = strtotime($viaje->fechaFin);
      $fechaFinSQLTime = date("Y-m-d H:i:s", $fechaFinNoSQLTime);
      $viaje->fechaFin = $fechaFinSQLTime;
      $parametros = array($viaje->fechaInicio,$viaje->fechaFin,$viaje->latDesde,$viaje->lngDesde,$viaje->latHasta,$viaje->lngHasta,$viaje->idUnidad,$viaje->idUsuario,$viaje->idConductor,$viaje->idEstadoViaje,$viaje->idMotivoEstado,$viaje->costoReal,$viaje->costoCalculado);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar($args)
   {
      $viaje = new Viaje($args["id"],$args["fechaInicio"],$args["fechaFin"],$args["latDesde"],$args["lngDesde"],$args["latHasta"],$args["lngHasta"],$args["idUnidad"],$args["idUsuario"],$args["idConductor"],$args["idEstadoViaje"],$args["idMotivoEstado"],$args["costoReal"],$args["costoCalculado"]);
      $sql = "UPDATE Viaje SET fechaInicio = ?,fechaFin = ?,latDesde = ?,lngDesde = ?,latHasta = ?,lngHasta = ?,idUnidad = ?,idUsuario = ?,idConductor = ?,idEstadoViaje = ?,idMotivoEstado = ?,costoReal = ?,costoCalculado = ? WHERE id = ?;";
      $fechaInicioNoSQLTime = strtotime($viaje->fechaInicio)-(5*3600);
      $fechaInicioSQLTime = date("Y-m-d H:i:s", $fechaInicioNoSQLTime);
      $viaje->fechaInicio = $fechaInicioSQLTime;
      $fechaFinNoSQLTime = strtotime($viaje->fechaFin)-(5*3600);
      $fechaFinSQLTime = date("Y-m-d H:i:s", $fechaFinNoSQLTime);
      $viaje->fechaFin = $fechaFinSQLTime;
      $parametros = array($viaje->fechaInicio,$viaje->fechaFin,$viaje->latDesde,$viaje->lngDesde,$viaje->latHasta,$viaje->lngHasta,$viaje->idUnidad,$viaje->idUsuario,$viaje->idConductor,$viaje->idEstadoViaje,$viaje->idMotivoEstado,$viaje->costoReal,$viaje->costoCalculado,$viaje->id);
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

   function leer_viajes_por($args)
   {
      $idUnidad = $args["idUnidad"];
      $idUsuario = $args["idUsuario"];
      $idConductor = $args["idConductor"];
      $fechaDesde = $args["fechaDesde"];
      $fechaHasta = $args["fechaHasta"];
      $fechaDesdeNoSQLTime = strtotime($fechaDesde);
      $fechaDesdeSQLTime = date("Y-m-d 00:00:00", $fechaDesdeNoSQLTime);
      $fechaHastaNoSQLTime = strtotime($fechaHasta);
      $fechaHastaSQLTime = date("Y-m-d 23:59:59", $fechaHastaNoSQLTime);
      $sql = "SELECT Viaje.*, CONCAT(Usuario.apellidos, ' ', Usuario.nombres) as 'Usuario', CONCAT(Conductor.apellidos, ' ', Conductor.nombres) as 'Conductor', CONCAT('No. ',Unidad.numero, ' - ', Unidad.placa) as 'Unidad' FROM Viaje LEFT JOIN Persona as Usuario ON Usuario.id = Viaje.idUsuario LEFT JOIN Persona as Conductor ON Conductor.id = Viaje.idConductor INNER JOIN Unidad ON Unidad.id = Viaje.idUnidad WHERE fechaInicio>? AND fechaFin<?;";
      $parametros = array($fechaDesdeSQLTime, $fechaHastaSQLTime);
      if(!($idUnidad == 0)){
            $sql = trim($sql,';');
            $sql = $sql.' AND idUnidad = ?;';
            array_push($parametros,$idUnidad);
      }
      if(!($idUsuario == 0)){
            $sql = trim($sql,';');
            $sql = $sql.' AND idUsuario = ?;';
            array_push($parametros,$idUsuario);
      }
      if(!($idConductor == 0)){
            $sql = trim($sql,';');
            $sql = $sql.' AND idConductor = ?;';
            array_push($parametros,$idConductor);
      }
      $sql = trim($sql,';');
      $sql = $sql.' ORDER BY fechaInicio, idUnidad, idUsuario, idConductor;';
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
   
   function leer_estadisticas_viajes_globales($args)
   {
      $idUsuario = $args["idUsuario"];
      $sql = "SELECT DATE(Viaje.fechaInicio) as 'Fecha', COUNT(*) as 'Cuenta' FROM Viaje GROUP BY DATE(Viaje.fechaInicio)";
      $parametros = array($idUsuario);
      $asc = $args["asc"];
      if($asc){
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) ASC;';
      }else {
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) DESC;';
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estadisticas_viajes_usuario($args)
   {
      $idUsuario = $args["idUsuario"];
      $sql = "SELECT DATE(Viaje.fechaInicio) as 'Fecha', COUNT(*) as 'Cuenta' FROM Viaje WHERE idUsuario = ? GROUP BY DATE(Viaje.fechaInicio)";
      $asc = $args["asc"];
      if($asc){
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) ASC;';
      }else {
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) DESC;';
      }
      $parametros = array($idUsuario);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estadisticas_viajes_conductor($args)
   {
      $idConductor = $args["idConductor"];
      $sql = "SELECT DATE(Viaje.fechaInicio) as 'Fecha', COUNT(*) as 'Cuenta' FROM Viaje WHERE idConductor = ? GROUP BY DATE(Viaje.fechaInicio)";
      $asc = $args["asc"];
      if($asc){
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) ASC;';
      }else {
         $sql = $sql.' ORDER BY DATE(Viaje.fechaInicio) DESC;';
      }
      $parametros = array($idConductor);
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
   
   function calcularDesplazamiento($args)
   {
      $latDesde = $args["latDesde"];
      $lngDesde = $args["lngDesde"];
      $latHasta = $args["latHasta"];
      $lngHasta = $args["lngHasta"];
      $fechaInicio = $args["fechaInicio"];
      $fechaFin = $args["fechaFin"];
      $fechaDesdeNoSQLTime = date_create($fechaInicio);
      $fechaHastaNoSQLTime = date_create($fechaFin);
      $tiempo = date_diff($fechaDesdeNoSQLTime, $fechaHastaNoSQLTime, true)->format('%h Horas %i minutos %s segundos');
      $radioTierra = 6378;
      $difLat = ($latDesde - $latHasta)*(pi()/180);
      $difLng = ($lngDesde - $lngHasta)*(pi()/180);
      $a = pow(sin($difLat/2),2) + cos($latDesde) * cos($latHasta) * pow(sin($difLng/2),2);
      $c = 2 * atan2(sqrt($a),sqrt(1-$a));
      $desplazamiento = $radioTierra * $c;      
      $respuesta = array("tiempo"=>$tiempo, "desplazamiento"=>number_format($desplazamiento, 2, '.', '').' Km');
      return $respuesta;
   }

   function leer_estadisticas_tasa_aceptacion_conductor($args)
   {
      $id = $args["id"];
      $sql = "SELECT * FROM (SELECT count(*) as Finalizados FROM Viaje WHERE Viaje.idEstadoViaje = 4 AND Viaje.idConductor = $id) a, (SELECT count(*) as Asignados FROM Viaje WHERE Viaje.idConductor = $id) b;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_estadisticas_tasa_aceptacion_cliente($args)
   {
      $id = $args["id"];
      $sql = "SELECT * FROM (SELECT count(*) as Finalizados FROM Viaje WHERE Viaje.idEstadoViaje = 4 AND Viaje.idUsuario = $id) a, (SELECT count(*) as Solicitados FROM Viaje WHERE Viaje.idUsuario = $id) b;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_viajes_hoy_conductor($args)
   {
      $id = $args["id"];
      $hoy = $args["hoy"];
      $hoyNoSQLTime = strtotime($hoy);
      $hoySQLTime = date("Y-m-d", $hoyNoSQLTime);
      $sql = "SELECT Viaje.*, CONCAT(Persona.apellidos,' ', Persona.nombres) as 'Usuario', TIME(Viaje.fechaInicio) as 'HoraInicio', TIME(Viaje.fechaFin) as 'HoraFin' FROM Viaje INNER JOIN Persona ON Viaje.idUsuario = Persona.id WHERE Viaje.idConductor = ? AND DATE(fechaInicio) = ? ORDER BY fechaInicio DESC;";
      $parametros = array($id, $hoySQLTime);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_viajes_hoy_cliente($args)
   {
      $id = $args["id"];
      $hoy = $args["hoy"];
      $hoyNoSQLTime = strtotime($hoy);
      $hoySQLTime = date("Y-m-d", $hoyNoSQLTime);
      $sql = "SELECT Viaje.*, Unidad.placa as 'UnidadPlaca', CONCAT(Persona.apellidos,' ', Persona.nombres) as 'Usuario', TIME(Viaje.fechaInicio) as 'HoraInicio', TIME(Viaje.fechaFin) as 'HoraFin' FROM Viaje INNER JOIN Persona ON Viaje.idUsuario = Persona.id INNER JOIN Unidad ON Viaje.idUnidad = Unidad.id WHERE Viaje.idUsuario = ? AND DATE(fechaInicio) = ? ORDER BY fechaInicio DESC;";
      $parametros = array($id, $hoySQLTime);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_viajes_ultimos_siete_dias_conductor($args)
   {
      $id = $args["id"];
      $sql = "SELECT COUNT(*) as cuenta FROM Viaje WHERE Viaje.idConductor = ? AND DATE(fechaInicio) > date_add(NOW(), INTERVAL -7 DAY);";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_viajes_ultimos_siete_dias_cliente($args)
   {
      $id = $args["id"];
      $sql = "SELECT COUNT(*) as cuenta FROM Viaje WHERE Viaje.idUsuario = ? AND DATE(fechaInicio) > date_add(NOW(), INTERVAL -7 DAY);";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
   
   function leer_total_viajes_conductor($args)
   {
      $id = $args["id"];
      $sql = "SELECT COUNT(*) as cuenta FROM Viaje WHERE Viaje.idConductor = ? AND Viaje.idEstadoViaje = 4;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
   
   function leer_total_viajes_cliente($args)
   {
      $id = $args["id"];
      $sql = "SELECT COUNT(*) as cuenta FROM Viaje WHERE Viaje.idUsuario = ? AND Viaje.idEstadoViaje = 4;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
   
   function leer_viaje_solicitud_asignado_unidad($args)
   {
      $id = $args["id"];
      $sql = "SELECT Viaje.id, Viaje.latDesde, Viaje.lngDesde, Viaje.latHasta, Viaje.lngHasta, Usuario.id as idUsuario, Usuario.nombres, Usuario.apellidos, Usuario.telefono1, Usuario.telefono2 FROM Viaje INNER JOIN Persona as Usuario ON Usuario.id = Viaje.idUsuario WHERE idEstadoViaje = 1 AND idUnidad = ?;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
   
   function verificarSiEnUso($args) {
      $idUnidad = $args["idUnidad"];
      $idConductor = $args["idConductor"];
      $sql = "SELECT * FROM Viaje WHERE idUnidad = ? AND idEstadoViaje < 4 AND idConductor = ?;";
      $parametros = array($idUnidad, $idConductor);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])||$respuesta[0]==0){
         return $respuesta;
      }
      $viaje = $respuesta[0];
      $sql = "SELECT Persona.id as idUsuario, Persona.nombres, Persona.apellidos, Persona.telefono1, Persona.telefono2 FROM Viaje INNER JOIN Persona ON Persona.id = Viaje.idUsuario WHERE Viaje.idUnidad = ? AND Viaje.idEstadoViaje < 4 AND Viaje.idConductor = ? AND Viaje.idEstadoViaje >1;";
      $parametros = array($idUnidad, $idConductor);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])||$respuesta[0]==0){
         return $respuesta;
      }
      $pasajero = $respuesta[0];
      return array("viaje"=>$viaje, "pasajero"=>$pasajero);
   }

   function nuevaSolicitudViaje($args) {
      $latDesde = $args["latDesde"];
      $lngDesde = $args["lngDesde"];
      $latHasta = $args["latHasta"];
      $lngHasta = $args["lngHasta"];
      $idUsuario = $args["idUsuario"];
      $idEstadoViaje = 1;
      $costoCalculado = $args["costoCalculado"];
      $parametros = array($latDesde, $lngDesde, $latHasta, $lngHasta, $idUsuario, $idEstadoViaje, $costoCalculado);
      $sql = "INSERT INTO Viaje (latDesde,lngDesde,latHasta,lngHasta,idUsuario,idEstadoViaje,costoCalculado) VALUES (?,?,?,?,?,?,?,?);";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return true;
   }

   function comprobarSolicitudViaje($args) {
      $id = $args["id"];
      $sql = "SELECT Viaje.id, Viaje.latDesde, Viaje.lngDesde, Viaje.latHasta, Viaje.lngHasta, Viaje.idUnidad, Unidad.placa, Unidad.numero, Unidad.registroMunicipal, Conductor.id as idConductor, Conductor.nombres, Conductor.apellidos, Conductor.telefono1, Conductor.telefono2 FROM Viaje INNER JOIN Persona as Conductor ON Conductor.id = Viaje.idConductor INNER JOIN Unidad ON Viaje.idUnidad = Unidad.id WHERE idEstadoViaje = 1 AND idUsuario = ?;";
      $parametros = array($id);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function rechazarViaje($args) {
      $idUnidad = $args["idUnidad"];
      $idConductor = $args["idConductor"];
      $idMotivoEstado = $args["idMotivoEstado"];
      $idViaje = $args["idViaje"];
      $parametros = array($idUnidad, $idConductor, $idMotivoEstado, $idViaje);
      $sql = "UPDATE Viaje SET idUnidad = ?,idConductor = ?,idEstadoViaje = 5,idMotivoEstado = ? WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      $parametros = array($idViaje);
      $sql = "SELECT * FROM Viaje WHERE id = ?;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      $latDesde = $respuesta[0]["latDesde"];
      $lngDesde = $respuesta[0]["lngDesde"];
      $latHasta = $respuesta[0]["latHasta"];
      $lngHasta = $respuesta[0]["lngHasta"];
      $idUsuario = $respuesta[0]["idUsuario"];
      $idEstadoViaje = 1;
      $costoCalculado = $respuesta[0]["costoCalculado"];
      $parametros = array($latDesde, $lngDesde, $latHasta, $lngHasta, $idUsuario, $idEstadoViaje, $costoCalculado);
      $sql = "INSERT INTO Viaje (latDesde,lngDesde,latHasta,lngHasta,idUsuario,idEstadoViaje,costoCalculado) VALUES (?,?,?,?,?,?,?);";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return true;
   }

   function viajesPendientes() {
      $sql = "SELECT Viaje.id FROM Viaje WHERE idUnidad = null;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])||$respuesta[0]==0){
            return "No existen viajes pendientes";
      }
      $idViaje = $respuesta[0]["id"];
      $sql = "SELECT Unidad.id FROM Unidad WHERE idEstadoUnidad = 1;";
      $parametros = array();
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])||$respuesta[0]==0){
            return "No existen unidades disponibles";
      }
      $idUnidad = $respuesta[0]["id"];
      $sql = "UPDATE Unidad SET idEstadoUnidad = 4 WHERE id = ?;";
      $parametros = array($idUnidad);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      $sql = "UPDATE Viaje SET idUnidad = ? WHERE id = ?;";
      $parametros = array($idUnidad, $idViaje);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return "Viaje asignado, esperando respuesta";
   }
}