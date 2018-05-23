import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoComponent } from './monitoreo.component';
import { CoperativaService } from '../CRUD/coperativa/coperativa.service';
import { UnidadService } from '../CRUD/unidad/unidad.service';
import { PosicionService } from '../CRUD/posicion/posicion.service';

@NgModule({
    imports: [CommonModule, MonitoreoRoutingModule, FormsModule],
    declarations: [MonitoreoComponent],
    providers: [CoperativaService, UnidadService, PosicionService]
})
export class MonitoreoModule {}
