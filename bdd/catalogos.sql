INSERT INTO `Calificacion` (`id`,`descripcion`) VALUES (1,'Servicio Malo');
INSERT INTO `Calificacion` (`id`,`descripcion`) VALUES (2,'Servicio Deficiente');
INSERT INTO `Calificacion` (`id`,`descripcion`) VALUES (3,'Servicio Regular');
INSERT INTO `Calificacion` (`id`,`descripcion`) VALUES (4,'Buen Servicio');
INSERT INTO `Calificacion` (`id`,`descripcion`) VALUES (5,'Excelente Servicio');
INSERT INTO `Genero` (`id`,`descripcion`) VALUES (1,'Masculino');
INSERT INTO `Genero` (`id`,`descripcion`) VALUES (2,'Femenino');
INSERT INTO `Rol` (`id`,`descripcion`) VALUES (1,'Administrador');
INSERT INTO `Rol` (`id`,`descripcion`) VALUES (2,'Supervisor');
INSERT INTO `Rol` (`id`,`descripcion`) VALUES (3,'Conductor');
INSERT INTO `Rol` (`id`,`descripcion`) VALUES (4,'Cliente');
INSERT INTO `EstadoCuenta` (`id`,`descripcion`) VALUES (1,'Pendiente');
INSERT INTO `EstadoCuenta` (`id`,`descripcion`) VALUES (2,'Activada');
INSERT INTO `EstadoCuenta` (`id`,`descripcion`) VALUES (3,'Desactivada');
INSERT INTO `EstadoUnidad` (`id`,`descripcion`) VALUES (1,'Libre');
INSERT INTO `EstadoUnidad` (`id`,`descripcion`) VALUES (2,'Ocupado');
INSERT INTO `EstadoUnidad` (`id`,`descripcion`) VALUES (3,'No Disponible');
INSERT INTO `EstadoUnidad` (`id`,`descripcion`) VALUES (4,'Solicitado');
INSERT INTO `Coperativa` (`id`,`RUC`,`nombre`,`direccion`,`telefono1`,`telefono2`) VALUES (1,'1720364049001','LSystems Taxi','Altos del Recreo','0998600661','023260618');
INSERT INTO `Persona` (`id`,`identificacion`,`nombres`,`apellidos`,`idGenero`,`direccion`,`telefono1`,`telefono2`,`correoElectronico`) VALUES (1,'1720364049','Luis Alfonso','Salazar Vaca',1,'CONOCOTO','0998600661','023260618','luissalazarvaca1986@gmail.com');
INSERT INTO Cuenta (idPersona,idRol,clave,idEstadoCuenta) VALUES (1,1,aes_encrypt('123','lsystems-taxi'),2);