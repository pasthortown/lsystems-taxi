import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ViajeRoutingModule } from './viaje-routing.module';
import { ViajeComponent } from './viaje.component';
import { ViajeService } from './viaje.service';
import { PersonaService } from '../persona/persona.service';
import { UnidadService } from '../unidad/unidad.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ViajeRoutingModule
   ],
   providers: [ViajeService, PersonaService, UnidadService],
   declarations: [ViajeComponent],
})
export class ViajeModule { }
