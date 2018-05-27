import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MotivoCalificacionConductorRoutingModule } from './motivocalificacionconductor-routing.module';
import { MotivoCalificacionConductorComponent } from './motivocalificacionconductor.component';
import { MotivoCalificacionConductorService } from './motivocalificacionconductor.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      MotivoCalificacionConductorRoutingModule
   ],
   providers: [MotivoCalificacionConductorService],
   declarations: [MotivoCalificacionConductorComponent],
})
export class MotivoCalificacionConductorModule { }
