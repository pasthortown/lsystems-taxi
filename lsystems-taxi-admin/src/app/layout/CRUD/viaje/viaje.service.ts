import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Viaje } from '../../../entidades/CRUD/Viaje';

@Injectable()

export class ViajeService {
   private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   private urlBase = environment.apiUrl + 'viaje';

   constructor(private http: Http) {
   }

   baseUrl(): string {
       return this.urlBase;
   }

   getAll(): Promise<Viaje[]> {
      return this.http.get(this.urlBase+'/leer').toPromise().then(response=>response.json() as Viaje[]).catch(this.handleError);
   }

   getPagina(pagina: number, tamanoPagina: number): Promise<Viaje[]> {
      return this.http.get(this.urlBase+'/leer_paginado' + '?pagina=' + pagina + '&registros_por_pagina=' + tamanoPagina).toPromise().then(response=>response.json() as Viaje[]).catch(this.handleError);
   }

   getFiltrado(columna: string, tipoFiltro: string, filtro: string): Promise<Viaje[]> {
      return this.http.get(this.urlBase+'/leer_filtrado' + '?columna=' + columna + '&tipo_filtro=' + tipoFiltro + '&filtro=' + filtro).toPromise().then(response=>response.json() as Viaje[]).catch(this.handleError);
   }

   getNumeroPaginas(tamanoPagina: number): Promise<any> {
      return this.http.get(this.urlBase+'/numero_paginas' + '?registros_por_pagina=' + tamanoPagina).toPromise().then(response=>response.json()).catch(this.handleError);
   }

   get(id: number): Promise<Viaje> {
      const url = `${this.urlBase+'/leer'}?id=${id}`;
      return this.http.get(url).toPromise().then(response=>(response.json() as Viaje[])[0]).catch(this.handleError);
   }

   getLeerViajesPor(idUnidad: number, idUsuario: number, idConductor: number, fechaDesde: string, fechaHasta: string): Promise<Viaje[]> {
    let url: string = `${this.urlBase+'/leer_viajes_por'}`;
    url = url + '?fechaDesde=' + fechaDesde + '&fechaHasta=' + fechaHasta + '&idUnidad=' + idUnidad + '&idUsuario=' + idUsuario + '&idConductor=' + idConductor;
    return this.http.get(url).toPromise().then(response=>response.json() as Viaje[]).catch(this.handleError);
   }

   remove(id: number): Promise<boolean> {
      const url = `${this.urlBase+'/borrar'}?id=${id}`;
      return this.http.get(url).toPromise().then(response=>response.json() as Viaje).catch(this.handleError);
   }

   create(entidadTransporte: Viaje): Promise<boolean> {
      const url = `${this.urlBase+'/crear'}`;
      return this.http.post(url, JSON.stringify(entidadTransporte)).toPromise().then(response=>response.json()).catch(this.handleError);
   }

   update(entidadTransporte: Viaje): Promise<boolean> {
      const url = `${this.urlBase+'/actualizar'}`;
      return this.http.post(url, JSON.stringify(entidadTransporte)).toPromise().then(response=>response.json()).catch(this.handleError);
   }

   handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}
