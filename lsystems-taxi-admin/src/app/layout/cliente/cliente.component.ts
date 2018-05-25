import { CuentaService } from './../CRUD/cuenta/cuenta.service';
import { Cuenta } from './../../entidades/CRUD/Cuenta';
import { EstadoCuentaService } from './../CRUD/estadocuenta/estadocuenta.service';
import { EstadoCuenta } from './../../entidades/CRUD/EstadoCuenta';
import { GeneroService } from './../CRUD/genero/genero.service';
import { Genero } from './../../entidades/CRUD/Genero';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Persona } from '../../entidades/CRUD/Persona';
import { PersonaService } from './../CRUD/persona/persona.service';

import 'rxjs/add/operator/toPromise';
import { ModalComponent } from './../bs-component/components';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
   selector: 'app-cliente',
   templateUrl: './cliente.component.html',
   styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit {

   busy: Promise<any>;
   entidades: Persona[];
   entidadSeleccionada: Persona;
   cuentaSeleccionada: Cuenta;
   pagina: 1;
   tamanoPagina: 20;
   paginaActual: number;
   paginaUltima: number;
   registrosPorPagina: number;
   esVisibleVentanaEdicion: boolean;
   generos: Genero[];
   estadosCuenta: EstadoCuenta[];

   constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private dataService: PersonaService, private modalService: NgbModal, private generoService: GeneroService, private estadoCuentaService: EstadoCuentaService, private cuentaService: CuentaService) {
      this.toastr.setRootViewContainerRef(vcr);
   }

   open(content, nuevo){
      if(nuevo){
         this.resetEntidadSeleccionada();
      }
      this.modalService.open(content)
      .result
      .then((result => {
         if(result=="save"){
            this.aceptar();
         }
      }),(result => {
         //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
      }));
   }

   estaSeleccionado(porVerificar): boolean {
      if (this.entidadSeleccionada == null) {
         return false;
      }
      return porVerificar.id === this.entidadSeleccionada.id;
   }

   cerrarVentanaEdicion(): void {
      this.esVisibleVentanaEdicion = false;
   }

   mostrarVentanaNuevo(): void {
      this.resetEntidadSeleccionada();
      this.esVisibleVentanaEdicion = true;
   }

   mostrarVentanaEdicion(): void {
      this.esVisibleVentanaEdicion = true;
   }

   resetEntidadSeleccionada(): void {
      this.entidadSeleccionada = this.crearEntidad();
   }

   getAll(): void {
      this.busy = this.dataService
      .getAll()
      .then(entidadesRecuperadas => {
         this.entidades = entidadesRecuperadas
         if (entidadesRecuperadas == null || entidadesRecuperadas.length === 0) {
            this.toastr.success('¡No hay datos!', 'Consulta');
         } else {
            this.toastr.success('La consulta fue exitosa', 'Consulta');
         }
      })
      .catch(error => {
         this.toastr.success('Se produjo un error', 'Consulta');
      });
   }

   getCuentas(rol: string): void {
      this.entidades = [];
      this.busy = this.dataService
      .getCuentas(rol)
      .then(entidadesRecuperadas => {
          if (JSON.stringify(entidadesRecuperadas)=='[0]') {
            this.toastr.success('¡No hay datos!', 'Consulta');
          } else {
            this.entidades = entidadesRecuperadas
          }
      })
      .catch(error => {
         this.toastr.success('Se produjo un error', 'Consulta');
      });
   }

   isValid(entidadPorEvaluar: Persona): boolean {
      return true;
   }

   aceptar(): void {
      if (!this.isValid(this.entidadSeleccionada)) {return;}
      if (this.entidadSeleccionada.id === undefined || this.entidadSeleccionada.id === 0) {
         this.add();
      } else {
         this.update();
      }
      this.cerrarVentanaEdicion();
   }

   crearEntidad(): Persona {
      const nuevoCliente = new Persona();
      nuevoCliente.id = 0;
      nuevoCliente.idGenero = 0;
      this.cuentaSeleccionada = new Cuenta();
      this.cuentaSeleccionada.id = 0;
      this.cuentaSeleccionada.idRol = 4;
      this.cuentaSeleccionada.idEstadoCuenta = 0;
      return nuevoCliente;
   }

   add(): void {
        if(this.entidadSeleccionada.identificacion == '' || this.entidadSeleccionada.identificacion == null ||
        this.entidadSeleccionada.nombres == '' || this.entidadSeleccionada.nombres == null ||
        this.entidadSeleccionada.apellidos == '' || this.entidadSeleccionada.apellidos == null ||
        this.entidadSeleccionada.direccion == '' || this.entidadSeleccionada.direccion == null ||
        this.entidadSeleccionada.correoElectronico == '' || this.entidadSeleccionada.correoElectronico == null ||
        this.entidadSeleccionada.telefono1 == '' || this.entidadSeleccionada.telefono1 == null ||
        this.entidadSeleccionada.telefono2 == '' || this.entidadSeleccionada.telefono2 == null ||
        this.entidadSeleccionada.idGenero == 0 || this.entidadSeleccionada.idGenero == null ||
        this.cuentaSeleccionada.idEstadoCuenta == 0 || this.cuentaSeleccionada.idEstadoCuenta == null
        ){
            this.toastr.warning('Todos los campos son obligatorios', 'Creación');
            return;
        }
      this.busy = this.dataService.crearCuenta(this.entidadSeleccionada.identificacion,this.entidadSeleccionada.nombres, this.entidadSeleccionada.apellidos,this.entidadSeleccionada.idGenero, this.entidadSeleccionada.direccion, this.entidadSeleccionada.telefono1, this.entidadSeleccionada.telefono2, this.entidadSeleccionada.correoElectronico, this.cuentaSeleccionada.idRol, this.cuentaSeleccionada.idEstadoCuenta)
      .then(respuesta => {
         if(respuesta){
            this.toastr.success('La creación fue exitosa', 'Creación');
         }else{
            this.toastr.warning('Se produjo un error', 'Creación');
         }
         this.refresh();
      })
      .catch(error => {
         this.toastr.warning('Se produjo un error', 'Creación');
      });
   }

   update(): void {
       if(this.entidadSeleccionada.identificacion == '' || this.entidadSeleccionada.identificacion == null ||
        this.entidadSeleccionada.nombres == '' || this.entidadSeleccionada.nombres == null ||
        this.entidadSeleccionada.apellidos == '' || this.entidadSeleccionada.apellidos == null ||
        this.entidadSeleccionada.direccion == '' || this.entidadSeleccionada.direccion == null ||
        this.entidadSeleccionada.correoElectronico == '' || this.entidadSeleccionada.correoElectronico == null ||
        this.entidadSeleccionada.telefono1 == '' || this.entidadSeleccionada.telefono1 == null ||
        this.entidadSeleccionada.telefono2 == '' || this.entidadSeleccionada.telefono2 == null ||
        this.entidadSeleccionada.idGenero == 0 || this.entidadSeleccionada.idGenero == null ||
        this.cuentaSeleccionada.idEstadoCuenta == 0 || this.cuentaSeleccionada.idEstadoCuenta == null
        ){
            this.toastr.warning('Todos los campos son obligatorios', 'Creación');
            return;
        }
      this.busy = this.dataService.actualizar_cuenta(this.entidadSeleccionada.id, this.entidadSeleccionada.identificacion, this.entidadSeleccionada.nombres, this.entidadSeleccionada.apellidos, this.entidadSeleccionada.idGenero, this.entidadSeleccionada.direccion, this.entidadSeleccionada.telefono1, this.entidadSeleccionada.telefono2,this.entidadSeleccionada.correoElectronico, this.cuentaSeleccionada.idEstadoCuenta)
      .then(respuesta => {
         if(respuesta){
            this.toastr.success('La actualización fue exitosa', 'Actualización');
         }else{
            this.toastr.warning('Se produjo un error', 'Actualización');
         }
         this.refresh();
      })
      .catch(error => {
         this.toastr.warning('Se produjo un error', 'Actualización');
      });
   }

   delete(entidadParaBorrar: Persona): void {
      this.busy = this.dataService.remove(entidadParaBorrar.id)
      .then(respuesta => {
         if(respuesta){
            this.toastr.success('La eliminación fue exitosa', 'Eliminación');
         }else{
            this.toastr.warning('Se produjo un error', 'Eliminación');
         }
         this.refresh();
      })
      .catch(error => {
         this.toastr.success('Se produjo un error', 'Eliminación');
      });
   }

   refresh(): void {
      this.getCuentas('Cliente');
      this.entidades = Persona[0];
      this.entidadSeleccionada = this.crearEntidad();
      this.getGeneros();
      this.getEstadosCuenta();
   }

   getGeneros(): void {
      this.busy = this.generoService
      .getAll()
      .then(entidadesRecuperadas => {
         this.generos = entidadesRecuperadas;
      })
      .catch(error => {

      });
   }

   getEstadosCuenta(): void {
      this.busy = this.estadoCuentaService
      .getAll()
      .then(entidadesRecuperadas => {
         this.estadosCuenta = entidadesRecuperadas;
      })
      .catch(error => {

      });
   }

   ngOnInit() {
      this.paginaActual=1;
      this.registrosPorPagina = 5;
      this.refresh();
   }

   onSelect(entidadActual: Persona): void {
      this.entidadSeleccionada = entidadActual;
      this.getCuentaAsociada();
   }

   getCuentaAsociada() {
       this.busy = this.cuentaService
      .getFiltrado('idPersona', 'coincide', this.entidadSeleccionada.id.toString())
      .then(respuesta => {
         this.cuentaSeleccionada = respuesta[0];
      })
      .catch(error => {

      });
   }
}
