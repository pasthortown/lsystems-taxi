import { EstadoCuentaService } from './../CRUD/estadocuenta/estadocuenta.service';
import { GeneroService } from './../CRUD/genero/genero.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConductorRoutingModule } from './conductor-routing.module';
import { ConductorComponent } from './conductor.component';
import { PersonaService } from '../CRUD/persona/persona.service';
import { CuentaService } from '../CRUD/cuenta/cuenta.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ConductorRoutingModule
   ],
   providers: [PersonaService, GeneroService, EstadoCuentaService, CuentaService],
   declarations: [ConductorComponent],
})
export class ConductorModule { }
