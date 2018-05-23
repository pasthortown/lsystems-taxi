import { CuentaService } from './../CRUD/cuenta/cuenta.service';
import { GeneroService } from './../CRUD/genero/genero.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { PersonaService } from '../CRUD/persona/persona.service';
import { EstadoCuentaService } from '../CRUD/estadocuenta/estadocuenta.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      AdministradorRoutingModule
   ],
   providers: [PersonaService, GeneroService, EstadoCuentaService, CuentaService],
   declarations: [AdministradorComponent],
})
export class AdministradorModule { }
