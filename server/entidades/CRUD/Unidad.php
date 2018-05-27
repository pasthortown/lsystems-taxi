<?php
class Unidad
{
   public $id;
   public $placa;
   public $numero;
   public $anoFabricacion;
   public $registroMunicipal;
   public $idEstadoUnidad;
   public $idCoperativa;

   function __construct($id,$placa,$numero,$anoFabricacion,$registroMunicipal,$idEstadoUnidad,$idCoperativa){
      $this->id = $id;
      $this->placa = $placa;
      $this->numero = $numero;
      $this->anoFabricacion = $anoFabricacion;
      $this->registroMunicipal = $registroMunicipal;
      $this->idEstadoUnidad = $idEstadoUnidad;
      $this->idCoperativa = $idCoperativa;
   }
}
?>