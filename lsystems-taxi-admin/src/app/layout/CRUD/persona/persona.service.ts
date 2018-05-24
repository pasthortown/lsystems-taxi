import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Persona } from '../../../entidades/CRUD/Persona';

@Injectable()

export class PersonaService {
   private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   private urlBase = environment.apiUrl + 'persona';

   constructor(private http: Http) {
   }

   baseUrl(): string {
       return this.urlBase;
   }

   getAll(): Promise<Persona[]> {
      return this.http.get(this.urlBase+'/leer').toPromise().then(response=>response.json() as Persona[]).catch(this.handleError);
   }

   getPagina(pagina: number, tamanoPagina: number): Promise<Persona[]> {
      return this.http.get(this.urlBase+'/leer_paginado' + '?pagina=' + pagina + '&registros_por_pagina=' + tamanoPagina).toPromise().then(response=>response.json() as Persona[]).catch(this.handleError);
   }

   getFiltrado(columna: string, tipoFiltro: string, filtro: string): Promise<Persona[]> {
      return this.http.get(this.urlBase+'/leer_filtrado' + '?columna=' + columna + '&tipo_filtro=' + tipoFiltro + '&filtro=' + filtro).toPromise().then(response=>response.json() as Persona[]).catch(this.handleError);
   }

   getNumeroPaginas(tamanoPagina: number): Promise<any> {
      return this.http.get(this.urlBase+'/numero_paginas' + '?registros_por_pagina=' + tamanoPagina).toPromise().then(response=>response.json()).catch(this.handleError);
   }

   get(id: number): Promise<Persona> {
      const url = `${this.urlBase+'/leer'}?id=${id}`;
      return this.http.get(url).toPromise().then(response=>(response.json() as Persona[])[0]).catch(this.handleError);
   }

   getCuentas(rol: string): Promise<Persona[]> {
      const url = `${environment.apiUrl+'cuentas/cuentas_clientes'}?rol=${rol}`;
      return this.http.get(url).toPromise().then(response=>(response.json() as Persona[])).catch(this.handleError);
   }

   crearCuenta(identificacion: string, nombres: string, apellidos: string, idGenero: number, direccion: string, telefono1: string, telefono2: string, correoElectronico: string, idRol: number, idEstadoCuenta: number): Promise<Boolean> {
      const url = `${environment.apiUrl+'cuentas/crear_cuenta'}`;
      const data = {identificacion: identificacion, nombres: nombres, apellidos: apellidos, idGenero: idGenero, direccion: direccion, telefono1: telefono1, telefono2: telefono2, correoElectronico: correoElectronico, idRol: idRol, idEstadoCuenta: idEstadoCuenta};
      return this.http.post(url,JSON.stringify(data)).toPromise().then(response=>(response.json() as Boolean)).catch(this.handleError);
   }

   actualizar_cuenta(idPersona: number, identificacion: string, nombres: string, apellidos: string, idGenero: number, direccion: string, telefono1: string, telefono2: string, correoElectronico: string, idEstadoCuenta: number): Promise<Boolean> {
      const url = `${environment.apiUrl+'cuentas/actualizar_cuenta'}`;
      const data = {idPersona: idPersona, identificacion: identificacion, nombres: nombres, apellidos: apellidos, idGenero: idGenero, direccion: direccion, telefono1: telefono1, telefono2: telefono2, correoElectronico: correoElectronico, idEstadoCuenta: idEstadoCuenta};
      return this.http.post(url,JSON.stringify(data)).toPromise().then(response=>(response.json() as Boolean)).catch(this.handleError);
   }

   remove(id: number): Promise<boolean> {
      const url = `${this.urlBase+'/borrar'}?id=${id}`;
      return this.http.get(url).toPromise().then(response=>response.json() as Persona).catch(this.handleError);
   }

   create(entidadTransporte: Persona): Promise<boolean> {
      const url = `${this.urlBase+'/crear'}`;
      return this.http.post(url, JSON.stringify(entidadTransporte)).toPromise().then(response=>response.json()).catch(this.handleError);
   }

   update(entidadTransporte: Persona): Promise<boolean> {
      const url = `${this.urlBase+'/actualizar'}`;
      return this.http.post(url, JSON.stringify(entidadTransporte)).toPromise().then(response=>response.json()).catch(this.handleError);
   }

   handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}
