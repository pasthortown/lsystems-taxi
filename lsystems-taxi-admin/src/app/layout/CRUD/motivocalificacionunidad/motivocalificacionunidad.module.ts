import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MotivoCalificacionUnidadRoutingModule } from './motivocalificacionunidad-routing.module';
import { MotivoCalificacionUnidadComponent } from './motivocalificacionunidad.component';
import { MotivoCalificacionUnidadService } from './motivocalificacionunidad.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      MotivoCalificacionUnidadRoutingModule
   ],
   providers: [MotivoCalificacionUnidadService],
   declarations: [MotivoCalificacionUnidadComponent],
})
export class MotivoCalificacionUnidadModule { }
