<?php
class Cuenta
{
   public $id;
   public $idPersona;
   public $idRol;
   public $clave;
   public $idEstadoCuenta;

   function __construct($id,$idPersona,$idRol,$clave,$idEstadoCuenta){
      $this->id = $id;
      $this->idPersona = $idPersona;
      $this->idRol = $idRol;
      $this->clave = $clave;
      $this->idEstadoCuenta = $idEstadoCuenta;
   }
}
?>