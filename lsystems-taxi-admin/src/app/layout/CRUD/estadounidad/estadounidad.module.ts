import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EstadoUnidadRoutingModule } from './estadounidad-routing.module';
import { EstadoUnidadComponent } from './estadounidad.component';
import { EstadoUnidadService } from './estadounidad.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      EstadoUnidadRoutingModule
   ],
   providers: [EstadoUnidadService],
   declarations: [EstadoUnidadComponent],
})
export class EstadoUnidadModule { }
