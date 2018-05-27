import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MotivoCalificacionEstiloConduccionRoutingModule } from './motivocalificacionestiloconduccion-routing.module';
import { MotivoCalificacionEstiloConduccionComponent } from './motivocalificacionestiloconduccion.component';
import { MotivoCalificacionEstiloConduccionService } from './motivocalificacionestiloconduccion.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      MotivoCalificacionEstiloConduccionRoutingModule
   ],
   providers: [MotivoCalificacionEstiloConduccionService],
   declarations: [MotivoCalificacionEstiloConduccionComponent],
})
export class MotivoCalificacionEstiloConduccionModule { }
