import { LoginResult } from './../entidades/especifico/Login-Result';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { LoginRequest } from './../entidades/especifico/Login-Request';

@Injectable()

export class LoginService {
   private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   private urlBase = environment.apiUrl + 'login';

   constructor(private http: Http) {
   }

   cuenta(entidadTransporte: LoginRequest): Promise<LoginResult> {
      const url = this.urlBase + '/cuenta';
      return this.http.post(url, JSON.stringify(entidadTransporte))
      .toPromise()
      .then(response=>{
          let toReturn = new LoginResult();
          toReturn.idRol = response.json().idRol;
          toReturn.persona = response.json().Persona;
          return toReturn;
      })
      .catch(this.handleError);
   }

   passwordChange(email: string, accion:string): Promise<LoginResult> {
      const url = this.urlBase + '/passwordChange';
      const data = {email: email, accion: accion};
      return this.http.post(url,JSON.stringify(data))
      .toPromise()
      .then(response=>{
          return response;
      })
      .catch(this.handleError);
   }

   baseUrl(): string {
       return this.urlBase;
   }

   handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}
