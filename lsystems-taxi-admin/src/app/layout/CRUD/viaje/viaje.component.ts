import { PersonaService } from './../persona/persona.service';
import { UnidadService } from './../unidad/unidad.service';
import { Unidad } from './../../../entidades/CRUD/Unidad';
import { Persona } from './../../../entidades/CRUD/Persona';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { } from '@types/googlemaps';
import { Viaje } from '../../../entidades/CRUD/Viaje';
import { ViajeService } from './viaje.service';

import 'rxjs/add/operator/toPromise';
import { ModalComponent } from './../../bs-component/components';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
   selector: 'app-viaje',
   templateUrl: './viaje.component.html',
   styleUrls: ['./viaje.component.scss']
})

export class ViajeComponent implements OnInit {

   busy: Promise<any>;
   entidades: Viaje[];
   entidadSeleccionada: Viaje;
   esVisibleVentanaEdicion: boolean;
   clientes: Persona[];
   conductores: Persona[];
   unidades: Unidad[];
   idClienteSeleccionado: number;
   idConductorSeleccionado: number;
   idUnidadSeleccionada: number;
   fechaDesde: string;
   fechaHasta: string;
   mostrarResultados: boolean;
   @ViewChild('gmap') gmapElement: any;
   map: google.maps.Map;
   poly: google.maps.Polyline;
   marcadoresMapa = [];

   constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private dataService: ViajeService, private modalService: NgbModal, private unidadService: UnidadService, private personaService: PersonaService) {
      this.toastr.setRootViewContainerRef(vcr);
   }

   startGoogleMap() {
        const mapProp = {
            center: new google.maps.LatLng(-0.224710, -78.516763),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.poly = new google.maps.Polyline({
            strokeColor: '#ed8917',
            strokeOpacity: 1,
            strokeWeight: 3,
            geodesic: true,
            map: this.map
        });
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
       this.entidades = [];
       this.busy = this.dataService
      .getLeerViajesPor(this.idUnidadSeleccionada, this.idClienteSeleccionado, this.idConductorSeleccionado, this.fechaDesde, this.fechaHasta)
      .then(entidadesRecuperadas => {
         this.entidades = entidadesRecuperadas
         if (entidadesRecuperadas == null || entidadesRecuperadas.length === 0) {
            this.toastr.success('¡No hay datos!', 'Consulta');
            this.mostrarResultados = false;
         } else {
            this.toastr.success('La consulta fue exitosa', 'Consulta');
            this.mostrarResultados = true;
         }
      })
      .catch(error => {
         this.toastr.success('Se produjo un error', 'Consulta');
      });
   }

   getClientes() {
        this.busy = this.personaService
        .getListaPersonasRol(4)
        .then(entidadesRecuperadas => {
            this.clientes = entidadesRecuperadas
        })
        .catch(error => {

        });
   }

   getConductores() {
        this.busy = this.personaService
        .getListaPersonasRol(3)
        .then(entidadesRecuperadas => {
        this.conductores = entidadesRecuperadas
        })
        .catch(error => {

        });
   }

   getUnidades() {
        this.busy = this.unidadService
        .getAll()
        .then(entidadesRecuperadas => {
            this.unidades = entidadesRecuperadas
        })
        .catch(error => {

        });
   }

   isValid(entidadPorEvaluar: Viaje): boolean {
      return true;
   }

   aceptar(): void {
      this.cerrarVentanaEdicion();
   }

   crearEntidad(): Viaje {
      const nuevoViaje = new Viaje();
      nuevoViaje.id = 0;
      return nuevoViaje;
   }

   refresh(): void {
      this.fechaDesde = new Date().toISOString();
      this.fechaHasta = new Date().toISOString();
      this.idClienteSeleccionado = 0;
      this.idConductorSeleccionado = 0;
      this.idUnidadSeleccionada = 0;
      this.getUnidades();
      this.getClientes();
      this.getConductores();
      this.entidadSeleccionada = this.crearEntidad();
   }

   ngOnInit() {
      this.refresh();
      this.mostrarResultados = false;
      this.startGoogleMap();
   }

   onSelect(entidadActual: Viaje): void {
      this.marcadoresMapa.forEach(element => {
           element.setMap(null);
      });
      this.marcadoresMapa = [];
      this.poly.getPath().clear();
      this.entidadSeleccionada = entidadActual;
      const inicio = new google.maps.LatLng(JSON.parse(entidadActual.latDesde) as number, JSON.parse(entidadActual.lngDesde) as number);
      const fin = new google.maps.LatLng(JSON.parse(entidadActual.latHasta) as number, JSON.parse(entidadActual.lngHasta) as number);
      let markerInicio = new google.maps.Marker({
        position: inicio,
        map: this.map,
        label: 'A',
        draggable: false,
        title: 'Inicio'
      });
      let markerFin = new google.maps.Marker({
        position: fin,
        map: this.map,
        label: 'B',
        draggable: false,
        title: 'Fin'
      });
      let infowindowInicio = new google.maps.InfoWindow({
        content: '<div><h6><strong>Partida</strong></h6>'+
                    '<small>' + entidadActual.Unidad + '</small><br/>'+
                    '<small>' + entidadActual.fechaInicio + '</small>'+
                    '</div>'
      });
      markerInicio.addListener('click', function() {
        infowindowInicio.open(this.map, markerInicio);
      });
      let infowindowFin = new google.maps.InfoWindow({
        content: '<div><h6><strong>Llegada</strong></h6>'+
                    '<small>' + entidadActual.Unidad + '</small><br/>'+
                    '<small>' + entidadActual.fechaFin + '</small>'+
                    '</div>'
      });
      markerFin.addListener('click', function() {
        infowindowFin.open(this.map, markerFin);
      });
      this.marcadoresMapa.push(markerInicio);
      this.marcadoresMapa.push(markerFin);
      this.poly.getPath().push(inicio);
      this.poly.getPath().push(fin);
      this.map.setCenter(inicio);
   }
}
