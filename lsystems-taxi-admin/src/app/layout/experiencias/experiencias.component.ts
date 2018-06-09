import { MotivoCalificacionEstiloConduccionService } from './../CRUD/motivocalificacionestiloconduccion/motivocalificacionestiloconduccion.service';
import { MotivoCalificacionConductorService } from './../CRUD/motivocalificacionconductor/motivocalificacionconductor.service';
import { MotivoCalificacionUnidadService } from './../CRUD/motivocalificacionunidad/motivocalificacionunidad.service';
import { MotivoCalificacionConductor } from './../../entidades/CRUD/MotivoCalificacionConductor';
import { MotivoCalificacionEstiloConduccion } from './../../entidades/CRUD/MotivoCalificacionEstiloConduccion';
import { MotivoCalificacionUnidad } from './../../entidades/CRUD/MotivoCalificacionUnidad';
import { AdjuntoService } from './../CRUD/adjunto/adjunto.service';
import { PersonaService } from './../CRUD/persona/persona.service';
import { Adjunto } from './../../entidades/CRUD/Adjunto';
import { Unidad } from './../../entidades/CRUD/Unidad';
import { Persona } from './../../entidades/CRUD/Persona';
import { ExpresionService } from './../CRUD/expresion/expresion.service';
import { Expresion } from './../../entidades/CRUD/Expresion';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UnidadService } from '../CRUD/unidad/unidad.service';
import { saveAs } from "file-saver/FileSaver";

@Component({
    selector: 'app-experiencias',
    templateUrl: './experiencias.component.html',
    styleUrls: ['./experiencias.component.scss']
})
export class ExperienciasComponent implements OnInit {
    experiencias: Expresion[];
    busy: Promise<any>;
    experienciaSeleccionada: Expresion;
    remitente: Persona;
    unidad: Unidad;
    adjunto: Adjunto;
    adjuntoPresente: boolean;
    CalificacionUnidad: MotivoCalificacionUnidad;
    CalificacionConductor: MotivoCalificacionConductor;
    CalificacionEstiloConduccion: MotivoCalificacionEstiloConduccion;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private modalService: NgbModal, private experienciaService: ExpresionService, private unidadService: UnidadService, private personaService: PersonaService, private adjuntoService: AdjuntoService, private calificacionUnidadService: MotivoCalificacionUnidadService, private calificacionEstiloConduccionService: MotivoCalificacionEstiloConduccionService, private calificacionConductorService: MotivoCalificacionConductorService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.remitente = new Persona();
        this.unidad = new Unidad();
        this.adjunto = new Adjunto();
        this.adjunto.id = 0;
        this.experienciaSeleccionada = new Expresion();
        this.adjuntoPresente = false;
        this.getExperiencias();
    }

    getCalificacionConductor(id) {
        this.busy = this.calificacionConductorService.get(id)
        .then(respuesta => {
            this.CalificacionConductor = respuesta;
        })
        .catch(error => {
        });
    }

    getCalificacionUnidad(id) {
        this.busy = this.calificacionUnidadService.get(id)
        .then(respuesta => {
            this.CalificacionUnidad = respuesta;
        })
        .catch(error => {
        });
    }

    getCalificacionEstiloConduccion(id) {
        this.busy = this.calificacionEstiloConduccionService.get(id)
        .then(respuesta => {
            this.CalificacionEstiloConduccion = respuesta;
        })
        .catch(error => {
        });
    }

    getExperiencias() {
        this.experiencias = [];
        this.busy = this.experienciaService.getFiltrado('respuesta','coincide','')
        .then(respuesta => {
            if(JSON.stringify(respuesta) == '[0]'){
                return;
            }
            this.experiencias = respuesta;
        })
        .catch(error => {
            this.toastr.warning('Se produjo un error', 'Lectura de Datos');
        });
    }

    onSelectExpresion(expresion: Expresion) {
        this.experienciaSeleccionada = expresion;
        this.getRemitente();
        this.getUnidad();
        this.getCalificacionConductor(this.experienciaSeleccionada.idMotivoCalificacionConductor);
        this.getCalificacionEstiloConduccion(this.experienciaSeleccionada.idMotivoCalificacionEstiloConduccion);
        this.getCalificacionUnidad(this.experienciaSeleccionada.idMotivoCalificacionUnidad);
        if (this.experienciaSeleccionada.idAdjunto == null || this.experienciaSeleccionada.idAdjunto == 0) {
            this.adjuntoPresente = false;
        }else {
            this.adjuntoPresente = true;
        }
    }

    getUnidad() {
        this.busy = this.unidadService.get(this.experienciaSeleccionada.idUnidad)
        .then(respuesta => {
            this.unidad = respuesta;
        })
        .catch(error => {

        });
    }

    getRemitente() {
        this.busy = this.personaService.get(this.experienciaSeleccionada.idUsuario)
        .then(respuesta => {
            this.remitente = respuesta;
        })
        .catch(error => {

        });
    }

    mostrarInfo(content, id){
        const options: NgbModalOptions = {
          size: 'lg'
        };
        this.modalService.open(content, options)
        .result
        .then((result => {
           this.calificar(result);
        }),(result => {
           //Esto se ejecuta si la ventana se cierra sin aceptar los cambios
        }));
    }

    estaSeleccionado(porVerificar) {
        if (this.experienciaSeleccionada == null) {
            return false;
        }
        return porVerificar.id === this.experienciaSeleccionada.id;
    }

    obtenerAdjunto() {
        if(this.experienciaSeleccionada.idAdjunto == null || this.experienciaSeleccionada.idAdjunto == 0){
            this.toastr.warning('No existe adjunto', 'Consulta de datos');
            return;
        }
        this.busy = this.adjuntoService.get(this.experienciaSeleccionada.idAdjunto)
        .then(respuesta => {
            if(JSON.stringify(respuesta) == '[0]'){
                this.adjunto = new Adjunto();
                this.adjunto.id = 0;
                this.toastr.warning('No existe adjunto', 'Consulta de datos');
                return;
            }
            this.adjunto = respuesta;
            this.downloadFile();
        })
        .catch(error => {
            this.toastr.warning('No existe adjunto', 'Consulta de datos');
        });
    }

    downloadFile() {
        const byteCharacters = atob(this.adjunto.adjunto);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: ''+this.adjunto.tipoArchivo+'' });
        saveAs(blob, this.adjunto.nombreArchivo);
    }

    calificar(calificacion: string): void {
        switch(calificacion){
            case 'positivo':
                this.experienciaSeleccionada.idCalificacionConductor = 1;
                break;
            case 'no especifico':
                this.experienciaSeleccionada.idCalificacionConductor = 2;
                break;
            case 'negativo':
                this.experienciaSeleccionada.idCalificacionConductor = 3;
                break;
        }
        this.responder();
    }

    responder() {
        this.busy = this.experienciaService.update(this.experienciaSeleccionada)
        .then(respuesta => {
            if(respuesta){
                this.busy = this.experienciaService.enviarRespuesta(this.remitente.correoElectronico, this.remitente.nombres + ' ' + this.remitente.apellidos, this.experienciaSeleccionada.contenido, this.experienciaSeleccionada.respuesta)
                .then(respuesta2 => {
                    if(respuesta2){
                        this.toastr.success('Respuesta enviada satisfactoriamente', 'Responder');
                        this.refresh();
                    }else{
                        this.toastr.warning('Se produjo un error al responder', 'Responder');
                    }
                })
                .catch(error => {
                    this.toastr.warning('Se produjo un error al responder', 'Responder');
                });
            }else{
                this.toastr.warning('Se produjo un error al responder', 'Responder');
            }
        })
        .catch(error => {
            this.toastr.warning('Se produjo un error al responder', 'Responder');
        });
    }
}
