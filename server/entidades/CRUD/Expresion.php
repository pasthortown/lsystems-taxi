<?php
class Expresion
{
   public $id;
   public $idViaje;
   public $idUsuario;
   public $contenido;
   public $respuesta;
   public $idCalificacionUnidad;
   public $idCalificacionConductor;
   public $idCalificacionEstiloConduccion;
   public $idCalificacionUsuario;
   public $idMotivoCalificacionUsuario;
   public $idMotivoCalificacionUnidad;
   public $idMotivoCalificacionConductor;
   public $idMotivoCalificacionEstiloConduccion;
   public $idAdjunto;

   function __construct($id,$idViaje,$idUsuario,$contenido,$respuesta,$idCalificacionUnidad,$idCalificacionConductor,$idCalificacionEstiloConduccion,$idCalificacionUsuario,$idMotivoCalificacionUsuario,$idMotivoCalificacionUnidad,$idMotivoCalificacionConductor,$idMotivoCalificacionEstiloConduccion,$idAdjunto){
      $this->id = $id;
      $this->idViaje = $idViaje;
      $this->idUsuario = $idUsuario;
      $this->contenido = $contenido;
      $this->respuesta = $respuesta;
      $this->idCalificacionUnidad = $idCalificacionUnidad;
      $this->idCalificacionConductor = $idCalificacionConductor;
      $this->idCalificacionEstiloConduccion = $idCalificacionEstiloConduccion;
      $this->idCalificacionUsuario = $idCalificacionUsuario;
      $this->idMotivoCalificacionUsuario = $idMotivoCalificacionUsuario;
      $this->idMotivoCalificacionUnidad = $idMotivoCalificacionUnidad;
      $this->idMotivoCalificacionConductor = $idMotivoCalificacionConductor;
      $this->idMotivoCalificacionEstiloConduccion = $idMotivoCalificacionEstiloConduccion;
      $this->idAdjunto = $idAdjunto;
   }
}
?>