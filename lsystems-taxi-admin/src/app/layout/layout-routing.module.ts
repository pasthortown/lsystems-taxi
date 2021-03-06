import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'admin-unidades', loadChildren: './CRUD/unidad/unidad.module#UnidadModule' },
            { path: 'admin-administradores', loadChildren: './administrador/administrador.module#AdministradorModule' },
            { path: 'admin-clientes', loadChildren: './cliente/cliente.module#ClienteModule' },
            { path: 'admin-conductores', loadChildren: './conductor/conductor.module#ConductorModule' },
            { path: 'monitoreo', loadChildren: './monitoreo/monitoreo.module#MonitoreoModule' },
            { path: 'viajes', loadChildren: './CRUD/viaje/viaje.module#ViajeModule' },
            { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilModule' },
            { path: 'experiencias', loadChildren: './experiencias/experiencias.module#ExperienciasModule' },
            { path: 'motivo-calificacion-conductor', loadChildren: './CRUD/motivocalificacionconductor/motivocalificacionconductor.module#MotivoCalificacionConductorModule' },
            { path: 'motivo-calificacion-unidad', loadChildren: './CRUD/motivocalificacionunidad/motivocalificacionunidad.module#MotivoCalificacionUnidadModule' },
            { path: 'motivo-calificacion-usuario', loadChildren: './CRUD/motivocalificacionusuario/motivocalificacionusuario.module#MotivoCalificacionUsuarioModule' },
            { path: 'motivo-calificacion-estilo-conduccion', loadChildren: './CRUD/motivocalificacionestiloconduccion/motivocalificacionestiloconduccion.module#MotivoCalificacionEstiloConduccionModule' },
            { path: 'motivo-estado', loadChildren: './CRUD/motivoestado/motivoestado.module#MotivoEstadoModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
