import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MotivoEstadoRoutingModule } from './motivoestado-routing.module';
import { MotivoEstadoComponent } from './motivoestado.component';
import { MotivoEstadoService } from './motivoestado.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      MotivoEstadoRoutingModule
   ],
   providers: [MotivoEstadoService],
   declarations: [MotivoEstadoComponent],
})
export class MotivoEstadoModule { }
