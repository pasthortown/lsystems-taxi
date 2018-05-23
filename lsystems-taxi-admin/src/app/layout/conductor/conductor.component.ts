import { CuentaService } from './../CRUD/cuenta/cuenta.service';
import { Cuenta } from './../../../../../lsystems-taxi-driver/src/app/entidades/CRUD/Cuenta';
import { EstadoCuenta } from './../../../../../lsystems-taxi-driver/src/app/entidades/CRUD/EstadoCuenta';
import { Genero } from './../../../../../lsystems-taxi-driver/src/app/entidades/CRUD/Genero';
import { GeneroService } from './../CRUD/genero/genero.service';
import { EstadoCuentaService } from './../CRUD/estadocuenta/estadocuenta.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Persona } from '../../entidades/CRUD/Persona';
import { PersonaService } from './../CRUD/persona/persona.service';

import 'rxjs/add/operator/toPromise';
import { ModalComponent } from './../bs-component/components';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
   selector: 'app-conductor',
   templateUrl: './conductor.component.html',
   styleUrls: ['./conductor.component.scss']
})

export class ConductorComponent implements OnInit {

   busy: Promise<any>;
   entidades: Persona[];
   entidadSeleccionada: Persona;
   pagina: 1;
   tamanoPagina: 20;
   paginaActual: number;
   paginaUltima: number;
   registrosPorPagina: number;
   esVisibleVentanaEdicion: boolean;
   generos: Genero[];
   estadosCuenta: EstadoCuenta[];
   cuentaSeleccionada: Cuenta;

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
         this.add(this.entidadSeleccionada);
      } else {
         this.update(this.entidadSeleccionada);
      }
      this.cerrarVentanaEdicion();
   }

   crearEntidad(): Persona {
      const nuevoConductor = new Persona();
      nuevoConductor.id = 0;
      nuevoConductor.idGenero = 0;
      this.cuentaSeleccionada = new Cuenta();
      this.cuentaSeleccionada.id = 0;
      this.cuentaSeleccionada.idRol = 3;
      return nuevoConductor;
   }

   add(entidadNueva: Persona): void {
      this.busy = this.dataService.create(entidadNueva)
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

   update(entidadParaActualizar: Persona): void {
      this.busy = this.dataService.update(entidadParaActualizar)
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
      this.getCuentas('Conductor');
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
