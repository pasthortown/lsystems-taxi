<?php
class FotografiaUnidad
{
   public $id;
   public $idUnidad;
   public $tipoArchivo;
   public $nombreArchivo;
   public $adjunto;

   function __construct($id,$idUnidad,$tipoArchivo,$nombreArchivo,$adjunto){
      $this->id = $id;
      $this->idUnidad = $idUnidad;
      $this->tipoArchivo = $tipoArchivo;
      $this->nombreArchivo = $nombreArchivo;
      $this->adjunto = $adjunto;
   }
}
?>