<?php
class Viaje
{
   public $id;
   public $fechaInicio;
   public $fechaFin;
   public $latDesde;
   public $lngDesde;
   public $latHasta;
   public $lngHasta;
   public $idUnidad;
   public $idUsuario;
   public $idConductor;
   public $idEstadoViaje;
   public $idMotivoEstado;
   public $costoReal;
   public $costoCalculado;

   function __construct($id,$fechaInicio,$fechaFin,$latDesde,$lngDesde,$latHasta,$lngHasta,$idUnidad,$idUsuario,$idConductor,$idEstadoViaje,$idMotivoEstado,$costoReal,$costoCalculado){
      $this->id = $id;
      $this->fechaInicio = $fechaInicio;
      $this->fechaFin = $fechaFin;
      $this->latDesde = $latDesde;
      $this->lngDesde = $lngDesde;
      $this->latHasta = $latHasta;
      $this->lngHasta = $lngHasta;
      $this->idUnidad = $idUnidad;
      $this->idUsuario = $idUsuario;
      $this->idConductor = $idConductor;
      $this->idEstadoViaje = $idEstadoViaje;
      $this->idMotivoEstado = $idMotivoEstado;
      $this->costoReal = $costoReal;
      $this->costoCalculado = $costoCalculado;
   }
}
?>