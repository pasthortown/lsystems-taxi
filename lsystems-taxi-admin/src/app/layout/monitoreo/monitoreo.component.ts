import { element } from 'protractor';
import { PosicionService } from './../CRUD/posicion/posicion.service';
import { Posicion } from './../../entidades/CRUD/Posicion';
import { UnidadService } from './../CRUD/unidad/unidad.service';
import { Unidad } from './../../entidades/CRUD/Unidad';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-monitoreo',
    templateUrl: './monitoreo.component.html',
    styleUrls: ['./monitoreo.component.scss']
})
export class MonitoreoComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
    busy: Promise<any>;
    unidades: Unidad[];
    posicionesUnidades: Posicion[];
    monitoreando: Boolean;
    minutosRefrescar: number;
    unidadesMonitoreadasMarcador = [];
    unidadSeleccionada: Unidad;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private unidadService: UnidadService, private posicionService: PosicionService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.monitoreando = false;
        this.startGoogleMap();
        this.unidadesMonitoreadasMarcador = [];
        this.minutosRefrescar = 0;
        this.getUnidades();
    }

    getUnidades() {
      this.unidades = [];
      this.busy = this.unidadService
      .getAll()
      .then(entidadesRecuperadas => {
        if(JSON.stringify(entidadesRecuperadas) == '[0]'){
            return;
        }
        this.unidades = entidadesRecuperadas;
        this.getPosicionesActuales();
      })
      .catch(error => {

      });
    }

    getPosicionesActuales() {
        this.posicionesUnidades = [];
        this.busy = this.posicionService
        .getPosicionActualAll()
        .then(entidadesRecuperadas => {
          if(JSON.stringify(entidadesRecuperadas) == '[0]'){
              return;
          }
          this.posicionesUnidades = entidadesRecuperadas;
          this.dibujarPosicionesActuales();
        })
        .catch(error => {

        });
    }

    dibujarPosicionesActuales() {

    }

    startGoogleMap() {
        const mapProp = {
            center: new google.maps.LatLng(-0.224710, -78.516763),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

    onSelectUnidad(unidad: Unidad){
        this.unidadSeleccionada = unidad;
    }

    estaSeleccionadaUnidad(unidad: Unidad): boolean {
        if (this.unidadSeleccionada == null) {
            return false;
        }
        return this.unidadSeleccionada.id === unidad.id;
    }

    actualizarMonitoreo() {
        this.getPosicionesActuales();
    }

    iniciarMonitoreo() {
        this.monitoreando = true;
        this.monitoreoContinuo();
    }

    monitoreoContinuo(){
        this.actualizarMonitoreo();
        if ( this.monitoreando) {
            setTimeout(() => {
            this.monitoreoContinuo();
            }, this.minutosRefrescar*1000);
        }
    }

    detenerMonitoreo() {
        this.monitoreando = false;
    }
}
