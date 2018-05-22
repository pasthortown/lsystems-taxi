<?php
class Expresion
{
   public $id;
   public $idUsuario;
   public $idUnidad;
   public $contenido;
   public $respuesta;
   public $idCalificacion;
   public $idAdjunto;

   function __construct($id,$idUsuario,$idUnidad,$contenido,$respuesta,$idCalificacion,$idAdjunto){
      $this->id = $id;
      $this->idUsuario = $idUsuario;
      $this->idUnidad = $idUnidad;
      $this->contenido = $contenido;
      $this->respuesta = $respuesta;
      $this->idCalificacion = $idCalificacion;
      $this->idAdjunto = $idAdjunto;
   }
}
?>