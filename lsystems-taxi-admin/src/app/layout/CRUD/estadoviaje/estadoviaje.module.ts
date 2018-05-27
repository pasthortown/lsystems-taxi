import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EstadoViajeRoutingModule } from './estadoviaje-routing.module';
import { EstadoViajeComponent } from './estadoviaje.component';
import { EstadoViajeService } from './estadoviaje.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      EstadoViajeRoutingModule
   ],
   providers: [EstadoViajeService],
   declarations: [EstadoViajeComponent],
})
export class EstadoViajeModule { }
