<?php
class Cuenta
{
   public $id;
   public $idPersona;
   public $idRol;
   public $clave;

   function __construct($id,$idPersona,$idRol,$clave){
      $this->id = $id;
      $this->idPersona = $idPersona;
      $this->idRol = $idRol;
      $this->clave = $clave;
   }
}
?>