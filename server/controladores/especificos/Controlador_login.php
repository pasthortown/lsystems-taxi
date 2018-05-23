<?php
include_once('../controladores/Controlador_Base.php');
include_once('../entidades/especificos/LoginResult.php');
include_once('../entidades/CRUD/Persona.php');
include_once('../controladores/especificos/Controlador_mail_sender.php');
class Controlador_login extends Controlador_Base
{
   function cuenta($args)
   { 
       $email = $args["email"];
       $clave = $args["clave"];
       $sql = "SELECT Persona.*, Cuenta.idRol as 'idRol' FROM Persona INNER JOIN Cuenta ON Cuenta.idPersona = Persona.id WHERE Persona.correoElectronico = ? AND Cuenta.clave = aes_encrypt(?,'".CIFRADO."');";
       $parametros = array($email, $clave);
       $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
       if(is_null($respuesta[0])||$respuesta[0]==0){
          return new LoginResult(0,new Persona);
       }else{
           $PersonaLogged = new Persona($respuesta[0]["id"],$respuesta[0]["identificacion"],$respuesta[0]["nombres"],$respuesta[0]["apellidos"],$respuesta[0]["idGenero"],$respuesta[0]["direccion"],$respuesta[0]["telefono1"],$respuesta[0]["telefono2"],$respuesta[0]["correoElectronico"]);
           $loginResult = new LoginResult((int)$respuesta[0]["idRol"],$PersonaLogged);
           return $loginResult;
       }
       return false;
   }

   function passwordRecovery($args)
   {
        $email = $args["email"];
        $accion = $args["accion"];
        $sql = "SELECT Cuenta.id, CONCAT(Persona.nombres,' ',Persona.apellidos) as 'usuario' FROM Persona INNER JOIN Cuenta ON Persona.id = Cuenta.idPersona WHERE Persona.correoElectronico = ?;";
        $parametros = array($email);
        $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
        $usuario = $respuesta[0]["usuario"];
        if(is_null($respuesta[0])||$respuesta[0]==0){
            return false;
        }else{
            $posiblesLetras = ['a','b','c','d','e','f','g','h','i','j','k','l',
                               'm','n','o','p','q','r','s','t','u','v','w','x'];
            $posiblesNumeros = ['1','2','3','4','5','6','7','8','9','0'];
            $generador = array();
            for($i = 0;$i<5;$i++){
                array_push($generador,$posiblesLetras[rand(0,count($posiblesLetras) - 1)]);
            }
            for($i = 0;$i<5;$i++){
                array_push($generador, strtoupper($posiblesLetras[rand(0,count($posiblesLetras) - 1)]));
            }
            for($i = 0;$i<5;$i++){
                array_push($generador, $posiblesNumeros[rand(0,count($posiblesNumeros) - 1)]);
            }
            shuffle($generador);
            $nuevaClave = "";
            foreach($generador as $caracter){
                $nuevaClave.=$caracter;
            }
            $sql = "UPDATE Cuenta SET clave = aes_encrypt(?,'".CIFRADO."') WHERE Cuenta.id = ?;";
            $parametros = array($nuevaClave, $respuesta[0]["id"]);
            $respuesta2 = $this->conexion->ejecutarConsulta($sql,$parametros);
            $mailSender = new Controlador_mail_sender();
            $cuerpoMensaje = '<div style="width:90%; float:left;"><div style="width:100%; float:left; border: 1px solid black; border-radius: 10px;"><div style="width:100%; float:left; padding-top:5px; padding-bottom:5px; font-family: Arial, Helvetica, sans-serif; background-color: darkblue; color: white; border-radius: 10px 10px 0px 0px;">&nbsp;';
            $cuerpoMensaje .= ALIASMAIL;
            $cuerpoMensaje .= '</div><div style="width:100%; float:left; text-align: center">';
            $cuerpoMensaje .= '<h3>'.$accion.'</h3>';
            $cuerpoMensaje .= '<div style="width:100%; float:left; text-align: left">';
            $cuerpoMensaje .= '<p>&nbsp;Estimado <strong>'.$usuario.'</strong>.</p>';
            $cuerpoMensaje .= '<p>&nbsp;Su nueva clave es <strong>'.$nuevaClave.'</strong></p>';
            $cuerpoMensaje .= '</div></div></div>';
            $mailSender->enviarMail(FROMMAIL,ALIASMAIL, CLAVEMAIL, 'no-responder@noresponder.com',ALIASMAIL,$email,$usuario,$cuerpoMensaje,$accion);
            return true;
        }
        return false;
   }
}