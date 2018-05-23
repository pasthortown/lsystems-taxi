import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConductorRoutingModule } from './conductor-routing.module';
import { ConductorComponent } from './conductor.component';
import { PersonaService } from '../CRUD/persona/persona.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ConductorRoutingModule
   ],
   providers: [PersonaService],
   declarations: [ConductorComponent],
})
export class ConductorModule { }
