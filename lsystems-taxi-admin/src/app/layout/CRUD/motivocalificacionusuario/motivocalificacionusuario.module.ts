import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MotivoCalificacionUsuarioRoutingModule } from './motivocalificacionusuario-routing.module';
import { MotivoCalificacionUsuarioComponent } from './motivocalificacionusuario.component';
import { MotivoCalificacionUsuarioService } from './motivocalificacionusuario.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      MotivoCalificacionUsuarioRoutingModule
   ],
   providers: [MotivoCalificacionUsuarioService],
   declarations: [MotivoCalificacionUsuarioComponent],
})
export class MotivoCalificacionUsuarioModule { }
