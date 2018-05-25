import { element } from 'protractor';
import { PosicionService } from './../CRUD/posicion/posicion.service';
import { Posicion } from './../../entidades/CRUD/Posicion';
import { UnidadService } from './../CRUD/unidad/unidad.service';
import { Unidad } from './../../entidades/CRUD/Unidad';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { } from '@types/googlemaps';
import { EstadoUnidad } from '../../entidades/CRUD/EstadoUnidad';
import { EstadoUnidadService } from '../CRUD/estadounidad/estadounidad.service';

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
    estadosUnidad: EstadoUnidad[];

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private unidadService: UnidadService, private posicionService: PosicionService, private estadoUnidadService: EstadoUnidadService) {
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
        this.getEstadosUnidad();
    }

    getEstadosUnidad() {
      this.busy = this.estadoUnidadService
      .getAll()
      .then(entidadesRecuperadas => {
        if(JSON.stringify(entidadesRecuperadas) == '[0]'){
            return;
        }
        this.estadosUnidad = entidadesRecuperadas;
      })
      .catch(error => {

      });
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
                },
                4: {
                    image : {
                        url: iconBase + 'Taxi_Solicitado.png',
                        size: new google.maps.Size(30, 30),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(30, 30),
                        scaledSize: new google.maps.Size(30, 30)
                    }
                }
            };
            let location = new google.maps.LatLng(JSON.parse(posicionUnidad.latitud) as number,JSON.parse(posicionUnidad.longitud) as number);
            let estadoUnidad = 'Libre';
            this.estadosUnidad.forEach(estado => {
                if(posicionUnidad.idEstadoUnidad == estado.id){
                    estadoUnidad = estado.descripcion;
                }
            });
            let infowindow = new google.maps.InfoWindow({
                content: '<div><h4>' + 'No. ' + posicionUnidad.numero + ' - ' + posicionUnidad.placa + '</h4>'+
                        '<h5>' + Math.floor(JSON.parse(posicionUnidad.velocidad) as number) + ' Km/h</h5>'+
                        '<h6><strong>' + estadoUnidad + '</strong></h6>'+
                        '<small>' + posicionUnidad.tiempo + '</small>'+
                        '</div>'
            });
            let noEncontrado = true;
            let icono = icons[posicionUnidad.idEstadoUnidad<=4 ? posicionUnidad.idEstadoUnidad : 1].image;
            this.unidadesMonitoreadasMarcador.forEach(marcador => {
                if (marcador.getTitle() === 'No. ' + posicionUnidad.numero + ' - ' + posicionUnidad.placa) {
                    noEncontrado = false;
                    marcador.setIcon(icono);
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
                    icon: icono,
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
