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

   function __construct($id,$fechaInicio,$fechaFin,$latDesde,$lngDesde,$latHasta,$lngHasta,$idUnidad,$idUsuario,$idConductor){
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
   }
}
?>