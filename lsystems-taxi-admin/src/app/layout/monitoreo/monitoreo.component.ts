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
    poly: google.maps.Polyline;
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

    onSelectUnidad(unidad: Unidad){
        this.unidadSeleccionada = unidad;
        this.poly.setMap(null);
        this.poly = new google.maps.Polyline({
            strokeColor: '#ed8917',
            strokeOpacity: 1,
            strokeWeight: 3,
            geodesic: true,
            map: this.map
        });
    }

    estaSeleccionadaUnidad(unidad: Unidad): boolean {
        if (this.unidadSeleccionada == null) {
            return false;
        }
        return this.unidadSeleccionada.id === unidad.id;
    }

    actualizarMonitoreo() {

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
