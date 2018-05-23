<?php
class Unidad
{
   public $id;
   public $placa;
   public $numero;
   public $anoFabricacion;
   public $registroMunicipal;

   function __construct($id,$placa,$numero,$anoFabricacion,$registroMunicipal){
      $this->id = $id;
      $this->placa = $placa;
      $this->numero = $numero;
      $this->anoFabricacion = $anoFabricacion;
      $this->registroMunicipal = $registroMunicipal;
   }
}
?>