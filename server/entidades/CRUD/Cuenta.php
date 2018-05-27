<?php
class Cuenta
{
   public $id;
   public $idPersona;
   public $idRol;
   public $clave;
   public $idEstadoCuenta;
   public $idCoperativa;

   function __construct($id,$idPersona,$idRol,$clave,$idEstadoCuenta,$idCoperativa){
      $this->id = $id;
      $this->idPersona = $idPersona;
      $this->idRol = $idRol;
      $this->clave = $clave;
      $this->idEstadoCuenta = $idEstadoCuenta;
      $this->idCoperativa = $idCoperativa;
   }
}
?>