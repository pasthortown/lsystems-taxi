import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { PersonaService } from '../CRUD/persona/persona.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ClienteRoutingModule
   ],
   providers: [PersonaService],
   declarations: [ClienteComponent],
})
export class ClienteModule { }
