import { AdjuntoService } from './../CRUD/adjunto/adjunto.service';
import { UnidadService } from './../CRUD/unidad/unidad.service';
import { PersonaService } from './../CRUD/persona/persona.service';
import { ExpresionService } from './../CRUD/expresion/expresion.service';
import { MotivoCalificacionEstiloConduccionService } from './../CRUD/motivocalificacionestiloconduccion/motivocalificacionestiloconduccion.service';
import { MotivoCalificacionConductorService } from './../CRUD/motivocalificacionconductor/motivocalificacionconductor.service';
import { MotivoCalificacionUnidadService } from './../CRUD/motivocalificacionunidad/motivocalificacionunidad.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';

import { ExperienciasRoutingModule } from './experiencias-routing.module';
import { ExperienciasComponent } from './experiencias.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        CKEditorModule,
        ExperienciasRoutingModule],
    declarations: [ExperienciasComponent],
    providers: [ExpresionService, PersonaService, UnidadService, AdjuntoService, MotivoCalificacionEstiloConduccionService, MotivoCalificacionConductorService, MotivoCalificacionUnidadService]
})
export class ExperienciasModule {}
