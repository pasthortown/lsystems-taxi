import { GeneroService } from './../CRUD/genero/genero.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { PersonaService } from '../CRUD/persona/persona.service';
import { EstadoCuentaService } from '../CRUD/estadocuenta/estadocuenta.service';
import { CuentaService } from '../CRUD/cuenta/cuenta.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ClienteRoutingModule
   ],
   providers: [PersonaService, GeneroService, EstadoCuentaService, CuentaService],
   declarations: [ClienteComponent],
})
export class ClienteModule { }
