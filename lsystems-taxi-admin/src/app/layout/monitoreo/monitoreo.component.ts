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
        this.posicionesUnidades.forEach(posicionUnidad => {
            let iconBase = 'assets/images/';
            let icons = {
                1: {
                    image : {
                        url: iconBase + 'Taxi_Libre.png',
                        size: new google.maps.Size(30, 30),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(30, 30),
                        scaledSize: new google.maps.Size(30, 30)
                    }
                },
                2: {
                    image : {
                        url: iconBase + 'Taxi_Ocupado.png',
                        size: new google.maps.Size(30, 30),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(30, 30),
                        scaledSize: new google.maps.Size(30, 30)
                    }
                },
                3: {
                    image : {
                        url: iconBase + 'Taxi_No_Disponible.png',
                        size: new google.maps.Size(30, 30),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(30, 30),
                        scaledSize: new google.maps.Size(30, 30)
                    }
                }
            };
            let location = new google.maps.LatLng(JSON.parse(posicionUnidad.latitud) as number,JSON.parse(posicionUnidad.longitud) as number);
            let infowindow = new google.maps.InfoWindow({
                content: '<div><h4>' + 'No. ' + posicionUnidad.numero + ' - ' + posicionUnidad.placa + '</h4>'+
                        '<h5>' + Math.floor(JSON.parse(posicionUnidad.velocidad) as number) + ' Km/h</h5>'+
                        '<small>' + posicionUnidad.tiempo + '</small>'+
                        '</div>'
            });
            let noEncontrado = true;
            this.unidadesMonitoreadasMarcador.forEach(marcador => {
                if (marcador.getTitle() === 'No. ' + posicionUnidad.numero + ' - ' + posicionUnidad.placa) {
                    noEncontrado = false;
                    marcador.setIcon(icons[posicionUnidad.idEstadoUnidad].image);
                    marcador.setPosition(location);
                    google.maps.event.clearListeners(marcador,'click');
                    marcador.addListener('click', function() {
                        infowindow.open(this.map, marcador);
                    });
                }
            });
            if (noEncontrado){
                let marcadorNuevo = new google.maps.Marker({
                    position: location,
                    map: this.map,
                    draggable: false,
                    icon: icons[posicionUnidad.idEstadoUnidad].image,
                    title: 'No. ' + posicionUnidad.numero + ' - ' + posicionUnidad.placa
                });
                marcadorNuevo.addListener('click', function() {
                    infowindow.open(this.map, marcadorNuevo);
                });
                this.unidadesMonitoreadasMarcador.push(marcadorNuevo);
            }
        });
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
        this.posicionesUnidades.forEach(posicionUnidad => {
            if(posicionUnidad.idUnidad === unidad.id){
                let location = new google.maps.LatLng(JSON.parse(posicionUnidad.latitud) as number,JSON.parse(posicionUnidad.longitud) as number);
                this.map.setCenter(location);
            }
        });
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
