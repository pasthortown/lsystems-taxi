<?php
class Unidad
{
   public $id;
   public $idCoperativa;
   public $placa;
   public $numero;
   public $anoFabricacion;
   public $registroMunicipal;

   function __construct($id,$idCoperativa,$placa,$numero,$anoFabricacion,$registroMunicipal){
      $this->id = $id;
      $this->idCoperativa = $idCoperativa;
      $this->placa = $placa;
      $this->numero = $numero;
      $this->anoFabricacion = $anoFabricacion;
      $this->registroMunicipal = $registroMunicipal;
   }
}
?>