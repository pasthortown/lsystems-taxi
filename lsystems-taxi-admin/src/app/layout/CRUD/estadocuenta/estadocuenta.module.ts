import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EstadoCuentaRoutingModule } from './estadocuenta-routing.module';
import { EstadoCuentaComponent } from './estadocuenta.component';
import { EstadoCuentaService } from './estadocuenta.service';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      EstadoCuentaRoutingModule
   ],
   providers: [EstadoCuentaService],
   declarations: [EstadoCuentaComponent],
})
export class EstadoCuentaModule { }
